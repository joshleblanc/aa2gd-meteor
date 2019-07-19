import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { Game } from '/lib/Game';
import { Server } from '/lib/Server';
import { User } from '/lib/User';
import moment from 'moment';
import { daysOfWeek } from './utils';

const Events = new Mongo.Collection('events');

export const Event = Class.create({
    name: 'Event',
    collection: Events,
    fields: {
        name: {
            type: String,
            default: null
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
            this.save();
        }
    }
});