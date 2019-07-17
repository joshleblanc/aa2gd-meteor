import { Meteor } from 'meteor/meteor';
import { User } from '../lib/User';
import { Server } from '../lib/Server';
import { Game } from '../lib/Game';
import { Event } from '/lib/Event';
import { getGames } from '/lib/utils';

const discordReq = async function(path, token) {
  const api_url = "https://discordapp.com/api";
  const response = await HTTP.get(`${api_url}/${path}`, {
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
        connections: 1,
        timeTable: 1
      }
    })
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
        services: 1
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
    return Game.find({
      _id: {
        $in: ids
      }
    }, { sort: { name: 1 }})
  } else {
    this.ready();
  }
});

User.extend({
  meteorMethods: {
    async populate() {
      const token = this.services.discord.accessToken;
      const connections = await discordReq("users/@me/connections", token);
      let servers = await discordReq("users/@me/guilds", token);

      const steamConnection = connections.find(c => c.type === "steam");
      let games = [];
      if(steamConnection) {
        games = await getGames(steamConnection.id);
      }

      servers.forEach(s => {
        Server.upsert({id: s.id}, s);
      });

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
      return this.save();
    }
  }
})

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    { service: 'discord' },
    {
      $set: {
        loginStyle: "popup",
        clientId: "570931295253823488", 
        secret: "C6RXU2uDnb1Um1yxRxlnTXBdYsAiTCE8"
      }
    }
  );
});
