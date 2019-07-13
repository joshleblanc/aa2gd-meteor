import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const Games = new Mongo.Collection('games');

export const Game = Class.create({
  name: 'Game',
  collection: Games,
  fields: {
    appid: Number,
    name: String,
    playtime_forever: Number,
    img_icon_url: String,
    img_logo_url: String,
    has_community_visible_stats: {
      type: Boolean,
      optional: true
    },
    playtime_2weeks: {
      type: Number,
      optional: true
    }
  }
});