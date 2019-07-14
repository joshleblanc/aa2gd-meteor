import { readable, derived } from 'svelte/store';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { User } from '/lib/User';

function sub(fn) {
    return readable(false, set => {
        const computation = Tracker.autorun(() => {
            set(fn());
        });

        return () => computation.stop();
    })
}

export const usersReady = sub(() => {
    return Meteor.subscribe('currentUser').ready();
});

export const serversReady = sub(() => {
    const user = User.current();
    return Meteor.subscribe('servers', user.servers).ready();
})

export const gamesReady = sub(() => {
    const user = User.current();
    return Meteor.subscribe('games', user.games).ready();
})

export const eventsReady = sub(() => {
    const user = User.current();
    return Meteor.subscribe('events', user.servers).ready();
})
