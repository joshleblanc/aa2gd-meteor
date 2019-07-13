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

    let games = [];
    let servers = [];
    const computation = Tracker.autorun(() => {
        const user = User.current();
        Meteor.subscribe('servers', user.servers);
        Meteor.subscribe('games');
        servers = user.getServers().fetch();
        games = Game.find({}).fetch();
        console.log(servers);
    });

    let name;
    let server;
    let game;
    let date = moment();

    function submit() {
        console.log(name, server, game, date);
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
        <TextField label="Name" fullWidth value={name} on:change={e => name = e.target.value} />
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
        <Timepicker on:change={e => date = e.detail} value={date.format('YYYY-MM-DD HH:00')} />
        <Button variant="primary" on:click={submit}>Submit</Button>
    </StyledPaper>
</div>
