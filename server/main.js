import { Meteor } from 'meteor/meteor';
import { User } from '../lib/User';
import { Server, Servers } from '../lib/Server';
import { Game } from '../lib/Game';
import { Event } from '/lib/Event';
import { getGames, getAllGames } from '/lib/utils';
import { Webhook } from '/lib/Webhook';
import SteamID from 'steamid';
import './migrations';

const discordReq = function(path, token) {
  const api_url = "https://discordapp.com/api";
  const response = HTTP.get(`${api_url}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

Meteor.publish('currentUser', function() {
  if(this.userId) {
    const user = Meteor.users.findOne(this.userId);
    const users = Meteor.users.find({
      servers: {
        $elemMatch: {
          $in: user.servers
        }
      }
    }, {
      fields: {
        servers: 1,
        games: 1,
        profile: 1,
        "services.discord.username": 1,
        "services.discord.id": 1,
        "services.discord.avatar": 1,
        "services.resume": 1,
        "services.discord.accessToken": 1,
        alwaysAvailable: 1,
        connections: 1,
        hasGames: 1,
        checkGames: 1,
        timeTable: 1,
        avatarUrl: 1
      }
    });
    const servers = Server.find({
      _id: {
        $in: user.servers
      }
    });
    const events = Event.find({
      serverId: {
        $in: user.servers
      }
    });
    const games = Game.find({}, { sort: { name: 1 }});
    return [users, servers, events, games];
  } else {
    this.ready();
  }
});

Meteor.publish('webhooks', function() {
  if(this.userId) {
    return Webhook.find({
      creatorId: this.userId
    });
  } else {
    this.ready();
  }
});

Meteor.publish('event', function(id) {
  const event = Event.find({ _id: id });
  const users = Event.findOne({_id: id}).users();

  return [event, users];
});

User.extend({
  meteorMethods: {
    async populate() {
      const token = this.services.discord.accessToken;
      const connections = discordReq("users/@me/connections", token);
      let servers = discordReq("users/@me/guilds", token);
      const steamConnection = connections.find(c => c.type === "steam");
      let games = [];
      let gotGames = false;
      if(steamConnection) {
        try {
          const sid = new SteamID(steamConnection.id)
          sid.instance = SteamID.Instance.DESKTOP // 1
          games = getGames(sid.getSteamID64());
          gotGames = true;
        } catch(e) {
          console.log("Getting games failed");
          console.error(e);
        }
      }

      const serverBulk = Servers.rawCollection().initializeUnorderedBulkOp();
      servers.forEach(s => {
        const { id, ...server } = s;
        serverBulk.find({ id }).upsert().updateOne({ $set: server });
      });
      Meteor.wrapAsync(serverBulk.execute, serverBulk)();

      servers = Server.find({
        id: {
          $in: servers.map(s => s.id)
        }
      });

      games = Game.find({
        appid: {
          $in: games.map(s => s.appid)
        }
      });

      this.connections = connections;
      this.servers = servers.map(s => s._id);
      this.games = games.map(g => g._id);

      if(steamConnection && gotGames) {
        this.hasGames = true;
        this.checkGames = false;
      } else if(this.games.length === 0) {
        this.hasGames = false;
      }

      await this.cacheAvatar();

      return this.save();
    }
  }
});

SyncedCron.add({
  name: "Send reminders about events",
  schedule: parser => parser.text("every 15 minutes starting on 0th minute, 15th minute, 30th minute, or 45th minute"),
  job: () => {
    Event.sendReminders();
  }
});

SyncedCron.add({
  name: "Sync steam games",
  schedule: parser => parser.text("every 24 hours"),
  job: () => {
    getAllGames();
  }
});

Meteor.startup(() => {
  Migrations.migrateTo('latest');
  SyncedCron.start();
  ServiceConfiguration.configurations.upsert(
    { service: 'discord' },
    {
      $set: {
        loginStyle: "popup",
        clientId: "570931295253823488",
        secret: Meteor.settings.discord.secret
      }
    }
  );
});
