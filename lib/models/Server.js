import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { User } from './User';
import { Event } from './Event';

export const Servers = new Mongo.Collection('servers', { idGeneration: 'MONGO' });

export const Server = Class.create({
  name: 'Server',
  collection: Servers,
  fields: {
    name: String,
    icon: {
      type: String,
      optional: true
    },
    id: {
      type: String,
      index: 1
    },
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