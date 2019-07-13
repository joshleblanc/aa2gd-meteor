<script>
    import StyledPaper from '../components/StyledPaper';
    import TextField from '../components/TextField';
    import Autocomplete from '../components/autocomplete/Autocomplete';
    import { Tracker } from 'meteor/tracker';
    import { Server } from '/lib/Server';
    import { Game } from '/lib/Game';
    import { Meteor } from 'meteor/meteor';
    import Datepicker from 'svelte-calendar/src/Components/Datepicker';
    import Timepicker from '../components/Timepicker';

    let games = [];
    let servers = [];
    const computation = Tracker.autorun(() => {
        Meteor.subscribe('servers');
        Meteor.subscribe('games');
        servers = Server.find({}).fetch();
        games = Game.find({}).fetch();
        console.log(servers);
    });

    let server;
    let game;
    let date;

    const dateFormat = "#{Y}/#{m}/#{d}";

    $: console.log(server);
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
        <TextField label="Name" fullWidth />
        <Autocomplete 
            fullWidth
            label="Server"
            bind:selectedItem={server}
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
            bind:selectedItem={game}
            placeholder="Select a game"
            options={games.map(g => {
                return {
                    value: g._id,
                    name: g.name,
                    image: g.iconUrl()
                }
            })}
        />
        <Datepicker bind:formattedSelected={date} format={dateFormat}>
            <TextField fullWidth label="Date" value={date} readonly/>
        </Datepicker>
        <Timepicker />
    </StyledPaper>
</div>
