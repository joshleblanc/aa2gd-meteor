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
            default: null,
            validators: [{
              type: 'minLength',
              param: 3
            }]
        },
        url: {
          type: String,
          default: null,
          validators: [{
            type: 'regexp',
            param: /^https:\/\/discordapp\.com\/api\/webhooks\/\d*\/\w*$/,
            message: "Not a valid webhook URL"
          }]
        },
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
        this.validate({}, err => {
          if(!err) {
            return this.save();
          }
        });
      },
      delete() {
        if(this.creatorId === Meteor.userId()) {
          return this.remove();
        }
      }
    }
});