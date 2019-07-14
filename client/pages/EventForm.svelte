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

    let games = [];
    let servers = [];
    const computation = Tracker.autorun(() => {
        const user = User.current();
        Meteor.subscribe('servers', user.servers);
        Meteor.subscribe('games', user.games);
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
    date.setMinutes(0);
    date.setSeconds(0);

    $: {
        Meteor.call('availableUsers', { server, game, date }, (err, result) => {
            availableUsers = result;
        });
    }

    function setErrors(error) {
        errors = {};
        error.inner.forEach(e => {
            errors[e.params.path] = e.message;
        });
    }

    function setValid(valid) {
        if(valid) {
            errors = {};
        }
        formValid = valid;
    }

    $: schema.validate({
            name,
            server,
            game,
            date
        }, { abortEarly: false }).catch(error => {
            setErrors(error);
        }).then(valid => {
            setValid(!!valid);
        });

    $: console.log(formValid);
    function submit() {
        Meteor.call('createEvent', name, server, game, date)
    }
</script>

<style>
    .root {
        max-width: 496px;
        margin-left: auto;
        margin-right: auto;
    }
</style>

<div class="root">
    <StyledPaper title="Create a new event!">
        <TextField 
            label="Name" 
            fullWidth 
            value={name} 
            on:input={e => name = e.target.value} 
            helperText={errors.name}
        />
        <Autocomplete 
            fullWidth
            helperText={errors.server}
            label="Server"
            on:change={e => server = e.detail}
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
            helperText={errors.game}
            on:change={e => game = e.detail}
            placeholder="Select a game"
            options={games.map(g => {
                return {
                    value: g._id,
                    name: g.name,
                    image: g.iconUrl()
                }
            })}
        />
        <Timepicker on:change={e => date = e.detail} value={date.toLocaleString()} helperText={errors.date} />
        {#if server && game && date}
            <p>There are {availableUsers} users available for that server, game, and date.</p>
        {/if}
        <Button variant="primary" on:click={submit} disabled={!formValid}>Submit</Button>
    </StyledPaper>
</div>
