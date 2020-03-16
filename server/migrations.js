import { User } from '../lib/User';
import { Games } from '../lib/Game';

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
        Games.update({}, {
            $unset: {
                playtime_forever: "",
                has_community_visible_stats: "",
                playtime_windows_forever: "",
                playtime_mac_forever: "",
                playtime_linux_forever: "",
                playtime_2weeks: ""
            }
        }, {
            multi: true
        })
    },
    down: function() {}
});
