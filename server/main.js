import { Meteor } from 'meteor/meteor';
import { User } from '../lib/User';
import { Server } from '../lib/Server';
import { Game } from '../lib/Game';

const discordReq = async function(path, token) {
  const api_url = "https://discordapp.com/api";
  const response = await HTTP.get(`${api_url}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const getGames = async function(id) {
  const gamesResponse = await HTTP.get(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${Meteor.settings.steam.key}&steamid=${id}&format=json&include_appinfo=1&include_played_free_games=1`
  );
  const games = gamesResponse.data.response.games;
  const insertedGames = [];
  if (games) {
    games.forEach(g => {
      const { insertedId }= Game.upsert({ appid: g.appid }, g);
      if(insertedId) {
        insertedGames.push(insertedId);
      }
    })
  }
  return insertedGames;
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

Meteor.publish("servers", function() {
  const user = User.current();
  if(user) {
    return Server.find({
      _id: {
        $in: user.servers
      }
    });
  } else {
    this.ready();
  }
});

User.extend({
  meteorMethods: {
    async populate() {
      const token = this.services.discord.accessToken;
      const connections = await discordReq("users/@me/connections", token);
      const servers = await discordReq("users/@me/guilds", token);

      const steamConnection = connections.find(c => c.type === "steam");
      let gameIds = [];
      if(steamConnection) {
        gameIds = await getGames(steamConnection.id);
      }

      const insertedServers = [];
      servers.forEach(s => {
        const { insertedId } = Server.upsert({id: s.id}, s);
        if(insertedId) {
          insertedServers.push(insertedId);
        }
      });

      this.connections = connections;
      this.servers.push(...insertedServers);
      this.games.push(...gameIds);
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
