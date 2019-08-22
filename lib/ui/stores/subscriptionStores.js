import { readable, derived } from 'svelte/store';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { User } from '/lib/models/User';

function sub(fn) {
    return readable(false, set => {
        if(Meteor.isClient) {
            const computation = Tracker.autorun(() => {
                set(fn());
            });
            return () => computation.stop();
        } else {
            set(fn());
        }

    })
}

export const currentUser = sub(() => {
    return User.current();
})

export const currentUserReady = sub(() => {
    if(Meteor.isClient) {
        return Meteor.subscribe('currentUser').ready();
    } else {
        return true;
    }
});

export const webhooksReady = sub(() => {
    const user = User.current();
    if(user) {
        if(Meteor.client) {
            return Meteor.subscribe('webhooks').ready();
        } else {
            return true;
        }
    } else {
        return false;
    }
});

export const usersReady = sub(() => {
    const user = User.current();
    if(user) {
        if(Meteor.isClient) {
            return Meteor.subscribe('users', user.servers).ready();
        } else {
            return true;
        }
    } else {
        return false;
    }
    
});

export const serversReady = sub(() => {
    const user = User.current();
    if(user) {
        if(Meteor.isClient) {
            return Meteor.subscribe('servers', user.servers).ready();
        } else {
            return true;
        }
    } else {
        return false;
    }
})

export const gamesReady = sub(() => {
    const user = User.current();
    if(user) {
        if(Meteor.isClient) {
            return Meteor.subscribe('games', user.games).ready();
        } else {
            return true;
        }
    } else {
        return false;
    }
})

export const eventsReady = sub(() => {
    const user = User.current();
    if(user) {
        if(Meteor.isClient) {
            return Meteor.subscribe('events', user.servers).ready();
        } else {
            return true;
        }
    } else {
        return false;
    }
})
