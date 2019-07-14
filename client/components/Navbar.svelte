<script>
  import LoginButton from './LoginButton';
  import Button from './Button';
  import { Meteor } from 'meteor/meteor';
  import { Link } from 'svelte-routing';
  import { Tracker } from 'meteor/tracker';
  import { onDestroy } from 'svelte';
  import { User } from '../../lib/User';
  import { createEventDispatcher } from 'svelte';

  export let mobileOpen;

  let user;
  const computation = Tracker.autorun(() => {
    user = User.current();
  });

  const dispatch = createEventDispatcher();

  onDestroy(() => {
    computation.stop();
  });

  let headerClass;
  $: if(mobileOpen) {
    headerClass = "mobile-open"; 
  } else {
    headerClass = "";
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
    border-bottom: 1px solid black;

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

  .mobile-open {
    width: calc(100% - 240px);
  }

  .hamburger {
    padding-right: 16px;
  }
  @media (min-width: 601px) {
      .hamburger {
        display: none;
      }
  }
  /* @media (max-width: 600px) {
    header {
      width: 100%
    }
  } */
</style>

<header class={headerClass}>
  <div>
    <div class="hamburger" on:click={() => dispatch('mobileOpen')}>
      <Button>></Button>
    </div>
    <h6>Famti.me</h6>
    {#if user}
      <Link to="/events/new">
        <Button variant="primary">Create Event</Button>
      </Link>
    {:else}
      <LoginButton />
    {/if}
  </div>
</header>