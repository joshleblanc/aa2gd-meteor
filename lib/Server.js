import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';
import { User } from './User';
const Servers = new Mongo.Collection('servers');

export const Server = Class.create({
  name: 'Server',
  collection: Servers,
  fields: {
    name: String,
    icon: {
      type: String,
      optional: true
    },
    id: String,
    owner: Boolean,
    permissions: Number
  },
  helpers: {
    avatarUrl() {
      return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.png`;
    }
  }
})


if(Meteor.isServer) {
  Meteor.publish("servers", function() {
    const user = User.current();
    return Servers.find({
      _id: {
        $in: user.servers
      }
    });
  });
} else {
  Meteor.subscribe('servers');
}


