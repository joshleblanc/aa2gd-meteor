import { Class } from 'meteor/jagi:astronomy';

export const User = Class.create({
  name: 'User',
  collection: Meteor.users,
  fields: {
    connections: [Object],
    servers: [String],
    games: [String],
    profile: Object,
    services: Object
  },
  helpers: {
    avatarUrl() {
      console.log(this);
      const d = this.services.discord;
      return `http://cdn.discordapp.com/avatars/${d.id}/${d.avatar}.png`;
    }
  },
  meteorMethods: {
    toggleAvailableTime(day, time, offset) {
      console.log(day, time, offset);
    }
  }
})

User.current = function() {
  return User.findOne({ _id: Meteor.userId });
}

if(Meteor.isServer) {
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
          connections: 1
        }
      })
    } else {
      this.ready();
    }
  });
}
