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

  let selectedServer;
  let user;
  let servers;
  let games = [];
  let server;
  let selectedUsers = [];
  let users = [];
  
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
          games = Game.findCommon(selectedUserModels).fetch();
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

{#if $gamesReady && $serversReady && $usersReady}
  <Tracker deps={[selectedServer, selectedUsers]} fn={computation}>
    <div class="root">
      <StyledPaper title="Find common games between users">
        <Autocomplete
          fullWidth
          label="Server"
          on:change={e => selectedServer = e.detail}
          selected={selectedServer}
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
          label="Users"
          multiple
          on:change={e => selectedUsers = e.detail}
          placeholder="Select users"
          selected={selectedUsers}
          options={users.map(s => {
            return {
              value: s._id,
              name: s.services.discord.username,
              image: s.avatarUrl()
            }
          })}
        />
        {#each games as game}
          <StyledPaper>{game.name}</StyledPaper>
        {/each}
      </StyledPaper>
    </div>
  </Tracker>
{:else}
  <Loader />
{/if}