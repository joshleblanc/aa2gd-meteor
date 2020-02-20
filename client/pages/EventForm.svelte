<script>
    import StyledPaper from "../components/StyledPaper";
    import TextField from "../components/TextField";
    import Autocomplete from "../components/autocomplete/Autocomplete";
    import {Tracker} from "meteor/tracker";
    import {Server} from "/lib/Server";
    import {Game} from "/lib/Game";
    import {User} from "/lib/User";
    import {Meteor} from "meteor/meteor";
    import Timepicker from "../components/Timepicker";
    import moment from "moment";
    import Button from "/client/components/Button";
    import Yup from "yup";
    import Dialog from '../components/Dialog';
    import {Event} from "/lib/Event";
    import {format} from "../constants";
    import {
        gamesReady,
        serversReady,
        usersReady
    } from "../stores/subscriptionStores";
    import {makeUrl} from "../../lib/Game";
    import Loader from "../components/Loader";
    import {onDestroy} from "svelte";
    import {navigate} from "svelte-routing";
    import TextArea from "../components/TextArea.svelte";
    import ListItemAvatar from "../components/ListItemAvatar.svelte";
    import Icon from "../components/Icon.svelte";
    import UserList from "../components/UserList.svelte";

    let errors = {};
    let formValid = false;
    let selectedServer;
    let selectedGame;
    let games = [];
    let servers = [];
    let user;
    let users = [];
    let event = new Event();
    let loadingGames = false;
    let selectedGameUsers = null;

    event.date = new Date();
    event.date.setMinutes(0);
    event.date.setSeconds(0);

    const computation = Tracker.autorun(() => {
        user = User.current();
        if (user) {
            event.creatorId = user._id;
            servers = user.getServers().fetch();
            games = Game.find({}).fetch();
            users = User.find({}).fetch();
        }
    });

    const gameUsers = (serverId, gameId) => {
      return users.filter(u => u.games.some(g => g.equals(gameId)) && u.servers.some(s => s.equals(serverId))).length;
    };

    const counts = {};

    $: availableUsers = event.availableUsers();

    function setErrors(error) {
        formValid = false;
        errors = {};
        error.details.forEach(e => {
            errors[e.name] = e.message;
        });
    }

    function setValid(valid) {
        if (valid) {
            errors = {};
        }
        formValid = valid;
    }

    $: event.validate({stopOnFirstError: false}, err => {
        if (err) {
            setErrors(err);
        } else {
            setValid(true);
        }
    });

    const handleGameChange = e => {
        selectedGame = e.detail;
        event.gameId = selectedGame.value;
    };

    const handleServerChange = e => {
        selectedServer = e.detail;
        event.serverId = selectedServer.value;
        games.forEach(g => {
            counts[g._id] = gameUsers(event.serverId, g._id);
        });
    };

    const handleAdornmentClick = (e, id) => {
        console.log(e, id);
        e.stopPropagation();
        selectedGameUsers = id;
    };

    onDestroy(() => {
        computation.stop();
    });

    function submit() {
        event.insert(id => navigate(`/events/${id.toHexString()}`), null);
    }

</script>

<style>
    .root {
      max-width: 496px;
      margin-left: auto;
      margin-right: auto;
    }

    .adornment {
        height: 40px;
        display: flex;
        align-content: center;
        align-items: center;
        padding: 8px;
    }

    .adornment:hover {
        background-color: rgba(0,0,0,0.08);
    }
</style>

<div class="root">
    <StyledPaper title="Create a new event!">
        <TextField
            label="Name"
            fullWidth
            value={event.name}
            on:input={e => event.name = e.target.value}
            helperText={errors.name}
        />
        <TextArea
            fullWidth
            label="Description"
            value="{event.description}"
            on:input={e => event.description = e.target.value}
            helperText="{errors.description}"
        />
        <Autocomplete
            fullWidth
            helperText={errors.serverId}
            label="Server"
            selected={selectedServer}
            on:change={handleServerChange}
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
            selected={selectedGame}
            on:change={handleGameChange}
            placeholder="Select a game"
            loading="{loadingGames}"
            sortingFn={(a,b) => counts[b.value] !== undefined && counts[a.value] !== undefined ? counts[b.value] - counts[a.value] : 0}
            options={
                games.map(g => {
                    return {
                        value: g._id,
                        name: g.name,
                        count: counts[g._id],
                        image: makeUrl(g.appid, g.img_icon_url)
                    }
                })
            }
        >
            <div slot="adornment" let:option={option}>
                {#if selectedServer}
                    <div  class="adornment" on:click={e => handleAdornmentClick(e, option.value)}>
                        <ListItemAvatar>
                            <Icon>
                                <i class="far fa-user"></i>
                            </Icon>
                            {counts[option.value]}
                        </ListItemAvatar>
                    </div>
                {/if}
            </div>
        </Autocomplete>
        <Timepicker on:change={e => event.date = e.detail } value={event.date} helperText={errors.date} />
        {#if event.serverId && event.gameId && event.date}
            <p>There are {availableUsers} users available for that server, game, and date.</p>
        {/if}
        <Button variant="primary" on:click={submit} disabled={!formValid}>Submit</Button>
    </StyledPaper>
</div>
<Dialog open="{!!selectedGameUsers}" on:close={() => selectedGameUsers = null} title="Users">
    <UserList users="{User.find({ games: { $elemMatch: { $eq: selectedGameUsers }}}).fetch()}" />
</Dialog>
