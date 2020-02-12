<script>
  import {
    gamesReady,
    serversReady,
    usersReady
  } from "../stores/subscriptionStores";
  import { User } from "/lib/User";
  import { Game } from "/lib/Game";
  import { Server } from "/lib/Server";
  import Loader from "../components/Loader";
  import Tracker from "../components/Tracker";
  import StyledPaper from "../components/StyledPaper";
  import Autocomplete from "../components/autocomplete/Autocomplete";
  import ListItem from '../components/ListItem';
  import ListItemAvatar from '../components/ListItemAvatar';
  import ListItemText from '../components/ListItemText';
  import ListItemPrimaryText from '../components/ListItemPrimaryText';
  import FixedHeightList from '../components/FixedHeightList';
  import Avatar from '../components/Avatar';
  import yup from 'yup';

  let selectedServer;
  let user;
  let servers;
  let games = [];
  let server;
  let selectedUsers = [];
  let users = [];
  let errors = {};
  const schema = yup.object().shape({
    server: yup.string().required(),
    users: yup.array().min(2)
  });

  function setErrors(err) {
      err.forEach(e => {
        errors[e.path] = e.message
      });
  }

  function removeErrors() {
    errors = {};
  }

  $: {
    console.log(selectedUsers);
    removeErrors();
    schema.validate({
      server: selectedServer,
      users: selectedUsers
    }, { abortEarly: false }).catch(function(err) {
      setErrors(err.inner);
    });
  }

  const form = {}

  function computation() {
    user = User.current();
    if (user) {
      servers = user.getServers().fetch();
      if (selectedServer) {
        server = Server.findOne({ _id: selectedServer.value });
        if (server) {
          users = server.users().fetch();
          const selectedUserModels = User.find({
            _id: {
              $in: selectedUsers.map(su => su.value)
            }
          }).fetch();
          if(selectedUserModels.length > 1) {
            games = Game.findCommon(selectedUserModels).fetch();
          } else {
            games = [];
          }
        }
      }
    }
  }
</script>

<style>
  .root {
    max-width: 496px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<Tracker deps={[selectedServer, selectedUsers]} fn={computation}>
  <div class="root">
    <StyledPaper title="Find common games between users">
      <Autocomplete
        fullWidth
        label="Server"
        on:change={e => {
          selectedUsers = [];
          selectedServer = e.detail
        }}
        selected={selectedServer}
        placeholder="Select a server"
        helperText={errors.server}
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
        label="Users"
        multiple
        on:change={e => selectedUsers = e.detail}
        helperText={errors.users}
        placeholder="Select users"
        selected={selectedUsers}
        options={users.map(s => {
          return {
            value: s._id,
            name: s.services.discord.username,
            image: s.avatarUrl
          }
        })}
      />
      {#if selectedServer}
        {#if selectedUsers.length < 2}
          Select more than 1 user
        {:else}
          {#if games.length === 0}
            No common games! Make sure both users have connected their steam account.
          {:else}
            <FixedHeightList>
              {#each games as game}
                <ListItem>
                  <ListItemAvatar><Avatar src={game.iconUrl()} /></ListItemAvatar>
                  <ListItemText>
                    <ListItemPrimaryText>{game.name}</ListItemPrimaryText>
                  </ListItemText>
                </ListItem>
              {/each}
            </FixedHeightList>
          {/if}
        {/if}
      {:else}
        Select a server
      {/if}

    </StyledPaper>
  </div>
</Tracker>
