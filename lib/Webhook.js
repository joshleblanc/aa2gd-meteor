import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { User } from './User';
import { Server } from './Server';

const Webhooks = new Mongo.Collection('webhooks');

export const Webhook = Class.create({
    name: 'Webhook',
    collection: Webhooks,
    fields: {
        name: {
            type: String,
            default: null
        },
        url: String,
        creatorId: String,
        serverId: String
    },
    helpers: {
      creator() {
          return User.findOne({ _id: this.creatorId });
      },
      server() {
          return Server.findOne({ _id: this.serverId });
      }
    },
    meteorMethods: {
      insert() {
        return this.save();
      },
      delete() {
        return this.remove();
      }
    }
});