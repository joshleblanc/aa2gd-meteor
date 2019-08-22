import moment from 'moment';
import { Games } from './models/Game';
import { onDestroy } from 'svelte';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';


export const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const times = [];
for (let i = 0; i < 24; i++) {
  times.push(`${i}:00`);
}

export function toUtc(day, time) {
    const t = moment(time, 'HH:mm');
    t.set('day', day);
    t.utc();

    return `${daysOfWeek[t.day()]} ${t.format('HH:mm')}`;
}

export const getGames = function(id) {
  const gamesResponse = HTTP.get(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${Meteor.settings.steam.key}&steamid=${id}&format=json&include_appinfo=1&include_played_free_games=1`
  );
  const games = gamesResponse.data.response.games;
  if (games) {
    const bulk = Games.rawCollection().initializeUnorderedBulkOp()
    games.forEach(g => {
      const { appid, ...game } = g;
      bulk.find({ appid }).upsert().updateOne({ $set: game });
    });
    Meteor.wrapAsync(bulk.execute, bulk)();
    return games;
  }
  return [];
};

export function track(callback) {
  if(Meteor.isClient) {
    const computation = Tracker.autorun(() => {
      callback();
    });

    onDestroy(() => {
      computation.stop();  
    });
  } else {
    callback();
  }
}