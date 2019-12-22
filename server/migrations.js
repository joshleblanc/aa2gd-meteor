import { User } from '../lib/User';

Migrations.add({
    version: 1,
    name: 'Save user avatars',
    up: async function() {
        const promises = User.find({}).map(async u => {
            await u.cacheAvatar();
            u.save();
        });
        await Promise.all(promises);
    },
    down: function() {
        Meteor.users.update({
            $unset: {
                avatarUrl: ""
            }
        })
    }
});