import { Class } from 'meteor/jagi:astronomy';

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