import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const Games = new Mongo.Collection('games');

export const Game = Class.create({
  name: 'Game',
  collection: Games,
  fields: {

  }
});