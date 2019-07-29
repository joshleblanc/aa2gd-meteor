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

  function handleAlwaysAvailableChange() {
      user.toggleAlwaysAvailable();
  }
</script>

{#if user}
    <label>
        <input type="checkbox" class="nes-checkbox" checked={user.alwaysAvailable} on:change={handleAlwaysAvailableChange} />
        <span>Available at any time</span>
    </label>
{/if}
