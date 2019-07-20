import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { Game } from '/lib/Game';
import { Server } from '/lib/Server';
import { User } from '/lib/User';
import moment from 'moment';
import { HTTP } from 'meteor/http';
import { daysOfWeek } from './utils';
import { Webhook } from '/lib/Webhook';

const Events = new Mongo.Collection('events');

export const Event = Class.create({
    name: 'Event',
    collection: Events,
    fields: {
        name: {
            type: String,
            default: null,
            validators: [{
                type: 'minLength',
                param: 3
            }]
        },
        serverId: String,
        gameId: String,
        date: Date,
    },
    helpers: {
        game() {
            return Game.findOne({ _id: this.gameId });
        },
        server() {
            return Server.findOne({ _id: this.serverId });
        },
        webhooks() {
            return Webhook.find({
                serverId: this.serverId
            });
        },
        availableUsers() {
            const d = moment(this.date).utc();
            const time = d.format('HH:00');
            const timeTableTime = `${daysOfWeek[d.day()]} ${time}`;
            const users = User.find({
                servers: {
                    $elemMatch: {
                        $eq: this.serverId
                    }
                },
                $or: [
                    {
                        checkGames: false
                    },
                    {
                        games: {
                            $elemMatch: {
                                $eq: this.gameId
                            }
                        }
                    }
                ],
                $or: [
                    {
                        alwaysAvailable: true
                    },
                    {
                        timeTable: {
                            $elemMatch: {
                                $eq: timeTableTime
                            }
                        }
                    }
                ]
                
            });
            return users.count();
        }
    },
    meteorMethods: {
        insert() {
            this.validate({}, (err) => {
                if(!err) {
                    this.save();
                    const server = this.server();
                    const game = this.game();
                    const date = moment(this.date).utc();
                    const data = {
                        embeds: [
                          {
                            title: "Famti.me",
                            description: "An event has been created on Famti.me!",
                            url: `${Meteor.absoluteUrl()}event/${this._id}`,
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
                    const webhooks = this.webhooks().fetch();
                    webhooks.forEach(webhook => {
                        HTTP.post(webhook.url, { 
                            data, 
                            headers: {
                                "Content-Type": "application/json"
                            } 
                        })
                    });
                }
            });
        }
    }
});