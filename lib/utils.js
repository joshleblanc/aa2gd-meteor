import moment from 'moment';

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