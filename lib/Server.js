import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';
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
    future() {
      const now = new Date();
      return this.events().fetch().filter(event => event.date > now);
    },
    current() {
      const now = new Date();
      return this.events().fetch().filter(event => event.date < now && event.date > this.cutoff());
    },
    cutoff() {
      const currentCutoff = new Date();
      currentCutoff.setHours(currentCutoff.getHours() - 3);
      return currentCutoff;
    },
    past() {
      const now = new Date();
      this.events().fetch().filter(event => event.date < now && event.date <= this.cutoff() )
    },
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