import { Class } from 'meteor/jagi:astronomy';
import { Server } from '/lib/Server';
import { Game } from '/lib/Game';

export const User = Class.create({
  name: 'User',
  collection: Meteor.users,
  fields: {
    connections: {
      type: [Object],
      default: []
    },
    servers: {
      type: [String],
      default: []
    },
    games: {
      type: [String],
      default: []
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
      console.log(this);
      const d = this.services.discord;
      return `http://cdn.discordapp.com/avatars/${d.id}/${d.avatar}.png`;
    },
    getServers() {
      return Server.find({ 
        _id: {
          $in: this.servers
        }
      }).fetch();
    },
    getGames() {
      return Game.find({
        _id: {
          $in: this.games
        }
      });
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
    }
  }
})

User.current = function() {
  return User.findOne({ _id: Meteor.userId });
}