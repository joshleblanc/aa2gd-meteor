import { User } from '../lib/User';
import { Game } from '../lib/Game';

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

Migrations.add({
    version: 2,
    name: "Remove unused data",
    up: function() {
        Game.update({}, {
            $unset: {
                playtime_forever: 1,
                has_community_visible_stats: 1,
                playtime_windows_forever: 1,
                playtime_mac_forever: 1,
                playtime_linux_forever: 1,
                playtime_2weeks: 1
            }
        }, {
            multi: true
        })
    },
    down: function() {}
});
