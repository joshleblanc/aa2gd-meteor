<script>
    import { Tracker } from 'meteor/tracker';
    import { Meteor } from 'meteor/meteor';
    import { onDestroy } from 'svelte';
    import HeaderPaper from '../components/HeaderPaper';
    import Button from '../components/Button';
    import { makeDiscordAvatarUrl } from '../../lib/utils';

    let user;
    let avatarUrl;
    let name;
    let hasSteam = true;
    $: {
        if(user && user.services && user.services.discord) {
            let d = user.services.discord;
            avatarUrl = makeDiscordAvatarUrl(d.id, d.avatar);
            name = d.username;
        }
        if(user && user.connections) {
            hasSteam = user.connections.find(c => c.type === "steam");
        }
    }
    const computation = Tracker.autorun(() => {
        user = Meteor.user();
    });

    onDestroy(() => {
        computation.stop();
    });
</script>

<div class="columns">
    <div class="column">
        <HeaderPaper imgUrl={avatarUrl} title={name}>
            {#if !hasSteam}
                <Button>Connect Steam</Button>
            {/if}
            <Button variant="error" on:click={() => Meteor.logout()}>Logout</Button>
        </HeaderPaper>
    </div>
</div>