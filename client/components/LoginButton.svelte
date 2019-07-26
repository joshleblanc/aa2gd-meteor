<script>
  import Button from './Button.svelte';
  import { User } from '../../lib/User';

  function handleClick(event) {
    Meteor.loginWithDiscord({
      requestPermissions: ['identify', 'email', 'connections', 'guilds', 'guilds.join']
    }, (error) => {
      if (error) {
        console.error(error);
        // Do some error handling stuff
      } else {
        User.current().callMethod('populate', (err, result) => {
          console.error(err);
          console.log(result);
        });
      }
    });
  }
</script>


<Button variant="primary" on:click={handleClick}>Login</Button>
