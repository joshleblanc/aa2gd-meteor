import moment from 'moment';
import { Game } from '/lib/Game';

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

export const getGames = async function(id) {
  const gamesResponse = await HTTP.get(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${Meteor.settings.steam.key}&steamid=${id}&format=json&include_appinfo=1&include_played_free_games=1`
  );
  const games = gamesResponse.data.response.games;
  if (games) {
    games.forEach(g => {
      Game.upsert({ appid: g.appid }, g);
    })
  }
  return games;
};