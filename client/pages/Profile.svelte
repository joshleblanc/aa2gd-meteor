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
    import Dialog from '../components/Dialog'
    import Caption from '../components/Caption';
    import TextField from '../components/TextField';
    import SteamForm from '../components/SteamForm';
    import CheckGamesCheckbox from '../components/CheckGamesCheckbox';
    import AlwaysAvailableCheckbox from '../components/AlwaysAvailableCheckbox';
    import EventsPaper from '../components/EventsPaper';
    import { eventsReady } from '../stores/subscriptionStores';

    let user;
    let events = [];
    let steamModalOpen = false;
    const computation = Tracker.autorun(() => {
        user = User.current();
        if(user) {
            events = user.events().fetch();
        }
    });

    onDestroy(() => {
        computation.stop();
    });
</script>

{#if user}
    <HeaderPaper imgUrl={user.avatarUrl()} title={user.services.discord.username}>
        <CheckGamesCheckbox />
        <AlwaysAvailableCheckbox />
    </HeaderPaper>
    <StyledPaper title="Actions">
        {#if !user.hasGames}
            <Button on:click={() => steamModalOpen = true}>Connect Steam</Button>
        {/if}
        <Button variant="error" on:click={() => Meteor.logout()}>Logout</Button>
    </StyledPaper>

    <div class="columns is-multiline">
        <div class="column is-half-desktop is-full">
            <StyledPaper title="Times available">
                <TimeTable />
            </StyledPaper>
        </div>
        <div class="column is-half-desktop is-full">
            <EventsPaper events={events} />
        </div>
        <div class="column is-half-desktop is-full">
            <StyledPaper title="Servers">
                <ServerList />
            </StyledPaper>
        </div>
        <div class="column is-half-desktop is-full">
            <StyledPaper title="Connections">
                <ConnectionList />
            </StyledPaper>
        </div>
    </div>
{/if}

<SteamForm open={steamModalOpen} on:close={() => steamModalOpen = false}/>
