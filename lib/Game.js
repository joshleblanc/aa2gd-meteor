import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { User } from './User';

export const Games = new Mongo.Collection('games', { idGeneration: 'MONGO' });

export function makeUrl(id, hash) {
  if(hash) {
    return `http://media.steampowered.com/steamcommunity/public/images/apps/${id}/${hash}.jpg`;
  } else {
    return null;
  }
}

export const Game = Class.create({
  name: 'Game',
  collection: Games,
  fields: {
    appid: {
      type: Number,
      index: 1
    },
    name: String,
    img_icon_url: String,
    img_logo_url: String
  },
  helpers: {
    logoUrl() {
      return makeUrl(this.appid, this.img_logo_url);
    },
    iconUrl() {
      return makeUrl(this.appid, this.img_icon_url);
    }
  }
});


Game.findCommon = function(users) {
  const userGames = users.map(u => u.games).flat();
  const counts = {};
  userGames.forEach(ug => {
    counts[ug] = counts[ug] || 0;
    counts[ug] += 1;
  });
  const commonGames = userGames.filter(ug => counts[ug] === users.length);
  return this.find({
    _id: {
      $in: commonGames
    }
  })
};
