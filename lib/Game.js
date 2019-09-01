import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Games = new Mongo.Collection('games', { idGeneration: 'MONGO' });

function makeUrl(id, hash) {
  return `http://media.steampowered.com/steamcommunity/public/images/apps/${id}/${hash}.jpg`;
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
  console.log("finding common");
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
}