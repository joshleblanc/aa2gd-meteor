<script>
  import { User } from '/lib/User';
  import { Tracker } from 'meteor/tracker';
  import { onDestroy } from 'svelte';
  
  let user;
  const computation = Tracker.autorun(() => {
        user = User.current();
  });

  onDestroy(() => {
      computation.stop();
  });

  function handleCheckGamesChange() {
      user.toggleCheckGames();
  }
</script>

{#if user}
    <label>
        <input type="checkbox" class="nes-checkbox" checked={!user.checkGames} on:change={handleCheckGamesChange} />
        <span>Include unowned games</span>
    </label>
{/if}
