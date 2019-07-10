<script>
  import Button from './Button';
  import { Link } from 'svelte-routing';

  function handleClick(event) {
    Meteor.loginWithDiscord({
      requestPermissions: ['identify', 'email', 'connections', 'guilds', 'guilds.join']
    }, (error) => {
      if (error) {
        // Do some error handling stuff
      }
    });
  }
</script>

<style>
  header {
    top: 0;
    left: auto;
    right: 0;
    position: fixed;
    display: flex;
    z-index: 1100;
    box-sizing: border-box;
    flex-shrink: 0;
    flex-direction: column;
    width: 100%;
  }

  header > div {
    min-height: 64px;
    padding-left: 24px;
    padding-right: 24px;
    display: flex;
    position: relative;
    align-items: center;
  }

  h6 {
    flex-grow: 1;
  }
</style>

<header>
  <div>
    <h6>Famti.me</h6>
    <Link to="/test">
      <Button variant="primary" value="Create Event" on:click={handleClick}/>
    </Link>
    
  </div>
</header>