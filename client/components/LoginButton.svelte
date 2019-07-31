<script>
  import Button from './Button.svelte';
  import { User } from '../../lib/User';
  import { populatingUserData, loggingIn } from '../stores/state';
  import { navigate } from 'svelte-routing';

  function handleClick(event) {
    loggingIn.set(true);
    Meteor.loginWithDiscord({
      requestPermissions: ['identify', 'email', 'connections', 'guilds', 'guilds.join']
    }, (error) => {
      if (error) {
        console.log("Something went wrong logging in with discord");
        console.error(error);
      } else {
        populatingUserData.set(true);
        User.current().callMethod('populate', (err, result) => {
          if(err) {
            console.log("Something went wrong populating user data");
            console.error(err);
          } else {
            console.log("Done populating user data");
            navigate('/profile', { replace: true });
          }
          populatingUserData.set(false);
        });
      }
      loggingIn.set(false);
    });
  }
</script>


<Button variant="primary" on:click={handleClick}>Login</Button>
