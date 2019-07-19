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

    let user;
    let steamModalOpen = false;
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
                {#if !user.hasGames}
                    <Button on:click={() => steamModalOpen = true}>Connect Steam</Button>
                {/if}
                <Button variant="error" on:click={() => Meteor.logout()}>Logout</Button>
                <div slot="options">
                    <CheckGamesCheckbox />
                    <AlwaysAvailableCheckbox />
                </div>
            </HeaderPaper>
        </div>
    </div>

    <div class="columns is-multiline">
        <div class="column is-half-desktop is-full">
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

<SteamForm open={steamModalOpen} on:close={() => steamModalOpen = false}/>
