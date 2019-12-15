import { Class } from 'meteor/jagi:astronomy';
import { Server } from '/lib/Server';
import { Game } from '/lib/Game';
import { getGames, getSteamIdFromVanity } from '/lib/utils';
import { Event } from '/lib/Event';

export const User = Class.create({
  name: 'User',
  collection: Meteor.users,
  fields: {
    connections: {
      type: [Object],
      default: []
    },
    servers: {
      type: [Mongo.ObjectID],
      default: []
    },
    games: {
      type: [Mongo.ObjectID],
      default: []
    },
    hasGames: {
      type: Boolean,
      default: false
    },
    checkGames: {
      type: Boolean,
      default: true
    },
    alwaysAvailable: {
      type: Boolean,
      default: false
    },
    profile: Object,
    services: Object,
    timeTable: {
      type: [String],
      default: []
    }
  },
  helpers: {
    avatarUrl() {
      const d = this.services.discord;
      return `http://cdn.discordapp.com/avatars/${d.id}/${d.avatar}.png`;
    },
    getServers() {
      return Server.find({ 
        _id: {
          $in: this.servers
        }
      }, { sort: { name: 1 }});
    },
    events(options = {}) {
      return Event.find({
        userIds: {
          $elemMatch: {
            $eq: this._id
          }
        }
      }, options);
    },
    getGames() {
      return Game.find({
        _id: {
          $in: this.games
        }
      }, { sort: { name: 1 }});
    }
  },
  meteorMethods: {
    toggleAvailableTime(time) {
      if(!this.timeTable) this.timeTable = [];
      if(this.timeTable.includes(time)) {
        this.timeTable = this.timeTable.filter(t => t !== time);
      } else {
        this.timeTable.push(time);
      }

      return this.save();
    },
    toggleCheckGames() {
      this.checkGames = !this.checkGames;
      return this.save();
    },
    toggleAlwaysAvailable() {
      this.alwaysAvailable = !this.alwaysAvailable;
      return this.save();
    }
  }
})

User.current = function() {
  return User.findOne({ _id: Meteor.userId() });
}

if(Meteor.isServer) {
  User.extend({
    meteorMethods: {
      async setSteamGames(input) {
        let steamId;
        const nameUrlRegex = /^https:\/\/steamcommunity\.com\/id\/([A-Za-z0-9-_]+).*$/;
        const idUrlRegex = /^https:\/\/steamcommunity\.com\/profiles\/(\d+)$/;
        const nameMatch = input.match(nameUrlRegex);
        const idMatch = input.match(idUrlRegex);
        if(nameMatch) {
          steamId = getSteamIdFromVanity(nameMatch[1]);
        } else if(idMatch) {
          steamId = idMatch[1];
        }
        let games;
        try {
          games = await getGames(steamId);  
        } catch(e) {
          games = await getGames(getSteamIdFromVanity(steamId));
        }
        games = Game.find({
          appid: {
            $in: games.map(s => s.appid)
          }
        });
        this.games = games.map(g => g._id);
        this.hasGames = true;
        return this.save();
      }
    }
  })
}