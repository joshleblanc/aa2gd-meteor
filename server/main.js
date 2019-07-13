import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Server }  from '/lib/Server';
import { Game } from '../lib/Game';
import { User } from '../lib/User';

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

  Meteor.methods({
    async 'users.fetchInfo'() {
      const user = Accounts.user();
      const token = user.services.discord.accessToken;
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
      
      Accounts.users.update({ _id: user._id }, { 
        $set: {
          connections
        },
        $addToSet: {
          servers: { $each: insertedServers },
          games: { $each: gameIds }
        }
      });
    }
  })
});
