import { readable, derived } from 'svelte/store';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { User } from '/lib/User';
import { Webhook } from '/lib/Webhook';

function sub(fn) {
    return readable(false, set => {
        const computation = Tracker.autorun(() => {
            set(fn());
        });
        return () => computation.stop();
    })
}

export const currentUserReady = sub(() => {
    return Meteor.subscribe('currentUser').ready();
});

export const webhooksReady = sub(() => {
    const user = User.current();
    if(user) {
        return Meteor.subscribe('webhooks').ready();
    } else {
        return false;
    }
});
