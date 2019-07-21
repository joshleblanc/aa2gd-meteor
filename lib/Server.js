import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';
import { User } from './User';
import { Event } from './Event';
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
    },
    events(options = {}) {
      return Event.find({
        serverId: this._id
      }, options);
    },
    users() {
      return User.find({
        servers: {
          $elemMatch: {
            $eq: this._id
          }
        }
      });
    }
  }
});