import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { User } from './User';
import { Server } from './Server';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

const Webhooks = new Mongo.Collection('webhooks', { idGeneration: 'MONGO' });

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
          param: /^https:\/\/discordapp\.com\/api\/webhooks\/\d*\/[\w_-]*$/,
          message: "Not a valid webhook URL"
        }]
      },
      creatorId: String,
      serverId: Mongo.ObjectID
    },
    helpers: {
      creator() {
        return User.findOne({ _id: this.creatorId });
      },
      server() {
        return Server.findOne({ _id: this.serverId });
      },
      sendEvent(description, event) {
        const date = moment(event.date).utc();
        const server = event.server();
        const game = event.game();
        const users = event.users().fetch();
        
        const data = {
          content: users.map(u => `<@${u.services.discord.id}>`).join(),
          embeds: [
            {
              title: "Famti.me",
              description: description,
              url: `${Meteor.absoluteUrl()}events/${event._id.toHexString()}`,
              color: 7971883,
              timestamp: new Date().toISOString(),
              fields: [
                {
                  name: "Server",
                  value: server.name
                },
                {
                  name: "Game",
                  value: game.name
                },
                {
                  name: "Date",
                  value: date.format("dddd, MMMM Do YYYY")
                },
                {
                  name: "Time",
                  value: date.format("h:mm:ss a UTC")
                }
              ]
            }
          ]
        };
        HTTP.post(this.url, { 
          data, 
          headers: {
              "Content-Type": "application/json"
          } 
        })
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