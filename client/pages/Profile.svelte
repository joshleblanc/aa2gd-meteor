<script>
    import { Tracker } from 'meteor/tracker';
    import { Meteor } from 'meteor/meteor';
    import { onDestroy } from 'svelte';
    import StyledPaper from '../components/StyledPaper';
    import HeaderPaper from '../components/HeaderPaper';
    import Button from '../components/Button';
    import ServerList from '../components/ServerList';
    import ConnectionList from '../components/ConnectionList';
    import { User } from '../../lib/User';
    import TimeTable from '../components/TimeTable';

    let user;
    let avatarUrl;
    let name;
    let hasSteam = true;
    let serverIds = [];
    const computation = Tracker.autorun(() => {
        user = User.current();
    });

    onDestroy(() => {
        computation.stop();
    });
</script>

{#if user}
    <div class="columns">
        <div class="column">
            <HeaderPaper imgUrl={user.avatarUrl()} title={user.services.discord.username}>
                {#if !hasSteam}
                    <Button>Connect Steam</Button>
                {/if}
                <Button variant="error" on:click={() => Meteor.logout()}>Logout</Button>
            </HeaderPaper>
        </div>
    </div>

    <div class="columns is-multiline">
        <div class="column">
            <StyledPaper title="Times available">
                <TimeTable />
            </StyledPaper>
        </div>
        <div class="column">
            <StyledPaper title="Servers">
                <ServerList />
            </StyledPaper>
        </div>
        <div class="column">
            <StyledPaper title="Connections">
                <ConnectionList />
            </StyledPaper>
        </div>
    </div>
{/if}