<script>
  import StyledPaper from './StyledPaper';
  import Caption from './Caption';
  import TextField from './TextField';
  import Button from './Button';
  import Dialog from './Dialog';
  import { User } from '/lib/User';
  import { createEventDispatcher } from 'svelte';
  let steamId = "";
  export let open = false;
  const dispatch = createEventDispatcher();
  let error = null;
  let loading = false;

  function setSteamGames() {
    const user = User.current();
    loading = true;
    user.callMethod('setSteamGames', steamId, (err, res) => {
      loading = false;
      if(err) {
        error = "Couldn't find that steam account";
      } else {
        error = null;
        dispatch('close');
      }
    });
  }
</script>

<Dialog open={open} title="Connect steam account" on:close>
  <StyledPaper title="Oops!">
      <p>Looks like you need to connect your steam account.</p>
      <p>Enter your steam ID below to get your games.</p>
      <Caption>
          Your ID looks like:
          <br/>
          https://steamcommunity/id/{"<YOUR ID HERE>"}
          <br />
          or 
          <br />
          https://steamcommunity/profiles/{"<YOUR ID HERE>"}
      </Caption>
      <TextField 
          label="Steam ID"
          fullWidth
          value={steamId}
          on:input={e => steamId = e.target.value}
          helperText={error}
      />
      <Button 
        variant="primary" 
        on:click={setSteamGames}
        loading={loading}
      >
        Submit
      </Button>
  </StyledPaper>
</Dialog>