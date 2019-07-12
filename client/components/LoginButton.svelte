<script>
  import Button from './Button.svelte';

  function handleClick(event) {
    Meteor.loginWithDiscord({
      requestPermissions: ['identify', 'email', 'connections', 'guilds', 'guilds.join']
    }, (error) => {
      if (error) {
        // Do some error handling stuff
      } else {
        Meteor.call('users.fetchInfo');
      }
    });
  }
</script>


<Button variant="primary" on:click={handleClick}>Login</Button>
