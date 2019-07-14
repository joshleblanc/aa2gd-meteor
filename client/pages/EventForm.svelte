<script>
    import StyledPaper from '../components/StyledPaper';
    import TextField from '../components/TextField';
    import Autocomplete from '../components/autocomplete/Autocomplete';
    import { Tracker } from 'meteor/tracker';
    import { Server } from '/lib/Server';
    import { Game } from '/lib/Game';
    import { User } from '/lib/User';
    import { Meteor } from 'meteor/meteor';
    import Timepicker from '../components/Timepicker';
    import moment from 'moment';
    import Button from '/client/components/Button';
    import Yup from 'yup';
    import { Event } from '/lib/Event';
    import { gamesReady, serversReady } from '../stores/subscriptionStores';
    import Loader from '../components/Loader';
    import { onDestroy } from 'svelte';

    let games = [];
    let servers = [];
    const computation = Tracker.autorun(() => {
        const user = User.current();
        servers = user.getServers().fetch();
        games = user.getGames().fetch();
    });

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        server: Yup.string().required(),
        game: Yup.string().required(),
        date: Yup.string().required()
    });

    let errors = {};
    let formValid = false;
    let name;
    let server;
    let game;
    let availableUsers = 0;
    let date = new Date();
    let event = new Event();
    event.date = new Date();
    event.date.setMinutes(0);
    event.date.setSeconds(0);
    date.setMinutes(0);
    date.setSeconds(0);

    $: availableUsers = event.availableUsers();

    function setErrors(error) {
        console.log(error);
        formValid = false;
        errors = {};
        error.details.forEach(e => {
            errors[e.name] = e.message;
        });
    }

    function setValid(valid) {
        if(valid) {
            errors = {};
        }
        formValid = valid;
    }

    $: event.validate({ stopOnFirstError: false }, err => {
        if(err) {
            setErrors(err)
        } else {
            setValid(true);
        }
        
    });

    onDestroy(() => {
        computation.stop();
    })

    function submit() {
        event.insert();
    }
</script>

<style>
    .root {
        max-width: 496px;
        margin-left: auto;
        margin-right: auto;
    }
</style>

{#if $gamesReady && $serversReady}
    <div class="root">
        <StyledPaper title="Create a new event!">
            <TextField 
                label="Name" 
                fullWidth 
                value={name} 
                on:input={e => event.name = e.target.value} 
                helperText={errors.name}
            />
            <Autocomplete 
                fullWidth
                helperText={errors.serverId}
                label="Server"
                on:change={e => event.serverId = e.detail}
                placeholder="Select a server"
                options={servers.map(s => {
                    return {
                        value: s._id,
                        name: s.name,
                        image: s.avatarUrl()
                    }
                })}
            />
            <Autocomplete
                fullWidth
                label="Game"
                helperText={errors.gameId}
                on:change={e => event.gameId = e.detail}
                placeholder="Select a game"
                options={games.map(g => {
                    return {
                        value: g._id,
                        name: g.name,
                        image: g.iconUrl()
                    }
                })}
            />
            <Timepicker on:change={e => event.date = e.detail} value={event.date.toLocaleString()} helperText={errors.date} />
            {#if event.serverId && event.gameId && event.date}
                <p>There are {availableUsers} users available for that server, game, and date.</p>
            {/if}
            <Button variant="primary" on:click={submit} disabled={!formValid}>Submit</Button>
        </StyledPaper>
    </div>
{:else}
    <Loader />
{/if}
