import moment from 'moment';
import {Game, Games} from '/lib/Game';

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

export const getSteamIdFromVanity = function (vanity) {
  const resp = HTTP.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?key=${Meteor.settings.steam.key}&vanityurl=${vanity}`);
  if (resp.data.response.success === 1) {
    return resp.data.response.steamid;
  } else {
    throw new Error("Invalid Steam ID");
  }
}

export const getGames = function (id) {
  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${Meteor.settings.steam.key}&steamid=${id}&format=json&include_appinfo=1&include_played_free_games=1`
  console.log(url);
  const gamesResponse = HTTP.get(url);
  const games = gamesResponse.data.response.games;
  if (games) {
    const bulk = Games.rawCollection().initializeUnorderedBulkOp()
    games.forEach(g => {
      const {appid, name, img_icon_url, img_logo_url} = g;
      bulk.find({appid}).upsert().updateOne({
        $set: {
          name,
          img_icon_url,
          img_logo_url
        }
      });
    });
    Meteor.wrapAsync(bulk.execute, bulk)();
    return games;
  }
  return [];
};
