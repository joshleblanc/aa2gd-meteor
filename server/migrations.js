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

Migrations.add({
    version: 3,
    name: "Add index to game names",
    up: function() {
        Games.rawCollection().createIndex({ name: "text" });
        Games.rawCollection().createIndex({ appid: 1 });
    },
    down: function() {
        Games.rawCollection().dropIndex("name_text");
        Games.rawCollection().dropIndex({ appid: 1 });
    }
});