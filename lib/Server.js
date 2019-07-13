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
      if(this.icon) {
        return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.png`;
      } else {
        return null;
      }
    }
  }
});