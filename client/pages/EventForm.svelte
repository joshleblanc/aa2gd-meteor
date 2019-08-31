<script>
    import StyledPaper from "../components/StyledPaper";
    import TextField from "../components/TextField";
    import Autocomplete from "../components/autocomplete/Autocomplete";
    import { Tracker } from "meteor/tracker";
    import { Server } from "/lib/Server";
    import { Game } from "/lib/Game";
    import { User } from "/lib/User";
    import { Meteor } from "meteor/meteor";
    import Timepicker from "../components/Timepicker";
    import moment from "moment";
    import Button from "/client/components/Button";
    import Yup from "yup";
    import { Event } from "/lib/Event";
    import {
      gamesReady,
      serversReady,
      usersReady
    } from "../stores/subscriptionStores";
    import Loader from "../components/Loader";
    import { onDestroy } from "svelte";
    import { navigate } from "svelte-routing";

    let errors = {};
    let formValid = false;
    let name;
    let server;
    let game;
    let availableUsers = 0;
    let selectedServer;
    let selectedGame;
    let games = [];
    let servers = [];
    let user;
    let event = new Event();
    event.date = new Date();
    event.date.setMinutes(0);
    event.date.setSeconds(0);

    const computation = Tracker.autorun(() => {
      user = User.current();
      if (user) {
        event.creatorId = user._id;
        servers = user.getServers().fetch();
        games = Game.find({}).fetch();
      }
    });

    $: availableUsers = event.availableUsers();
    $: if (selectedServer) {
      event.serverId = selectedServer.value;
    }

    $: if (selectedGame) {
      event.gameId = selectedGame.value;
    }

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

    $: event.validate({ stopOnFirstError: false }, err => {
      if (err) {
        setErrors(err);
      } else {
        setValid(true);
      }
    });

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
</style>

{#if $gamesReady && $serversReady && $usersReady}
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
                selected={selectedServer}
                on:change={e => selectedServer = e.detail}
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
                on:change={e => selectedGame = e.detail}
                placeholder="Select a game"
                options={games.map(g => {
                    return {
                        value: g._id,
                        name: g.name,
                        image: g.iconUrl()
                    }
                })}
            />
            <Timepicker on:change={e => event.date = e.detail} value={event.date} helperText={errors.date} />
            {#if event.serverId && event.gameId && event.date}
                <p>There are {availableUsers} users available for that server, game, and date.</p>
            {/if}
            <Button variant="primary" on:click={submit} disabled={!formValid}>Submit</Button>
        </StyledPaper>
    </div>
{:else}
    <Loader />
{/if}
