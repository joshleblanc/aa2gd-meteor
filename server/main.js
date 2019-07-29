import { Meteor } from 'meteor/meteor';
import { User } from '../lib/User';
import { Server } from '../lib/Server';
import { Game } from '../lib/Game';
import { Event } from '/lib/Event';
import { getGames } from '/lib/utils';
import { Webhook } from '/lib/Webhook';

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
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        servers: 1,
        games: 1,
        profile: 1,
        services: 1,
        alwaysAvailable: 1,
        connections: 1,
        hasGames: 1,
        checkGames: 1,
        timeTable: 1
      }
    })
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

Meteor.publish('users', function(servers) {
  if(this.userId) {
    return Meteor.users.find({
      servers: {
        $elemMatch: {
          $in: servers
        }
      }
    }, {
      fields: {
        timeTable: 1,
        services: 1,
        alwaysAvailable: 1
      }
    })
  } else {
    this.ready();
  }
});

Meteor.publish('events', function(servers) {
  if(this.userId) {
    return Event.find({
      serverId: {
        $in: servers
      }
    });
  } else {
    this.ready();
  }

});

Meteor.publish("servers", function(ids) {
  if(this.userId) {
    return Server.find({
      _id: {
        $in: ids
      }
    });
  } else {
    this.ready();
  }
});

Meteor.publish("games", function(ids) {
  if(this.userId) {
    return Game.find({}, { sort: { name: 1 }})
  } else {
    this.ready();
  }
});

User.extend({
  meteorMethods: {
    populate() {
      console.log("Entering populate method");
      const token = this.services.discord.accessToken;
      console.log("Getting connections");
      const connections = discordReq("users/@me/connections", token);
      console.log("Done getting connections");
      console.log("Getting servers");
      let servers = discordReq("users/@me/guilds", token);
      console.log("Done getting servers");
      const steamConnection = connections.find(c => c.type === "steam");
      let games = [];
      if(steamConnection) {
        console.log("Getting games");
        games = getGames(steamConnection.id);
        console.log("Done getting games");
      }

      console.log("Upserting servers");
      servers.forEach(s => {
        Server.upsert({id: s.id}, s);
      });
      console.log("Done upserting servers");

      console.log("Finding user servers");
      servers = Server.find({
        id: {
          $in: servers.map(s => s.id)
        }
      });
      console.log("Done finding user servers");

      console.log("Finding user games");
      games = Game.find({
        appid: {
          $in: games.map(s => s.appid)
        }
      });
      console.log("Done finding user games");

      this.connections = connections;
      this.servers = servers.map(s => s._id);
      this.games = games.map(g => g._id);
      if(steamConnection) {
        this.hasGames = true;
        this.checkGames = false;
      }
      console.log("Saving");
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
})

Meteor.startup(() => {
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