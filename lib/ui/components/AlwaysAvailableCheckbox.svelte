<script>
  import { User } from '/lib/models/User';
  import { currentUser } from '../stores/subscriptionStores';

  function handleAlwaysAvailableChange() {
      $currentUser.toggleAlwaysAvailable();
  }
</script>

{#if $currentUser}
    <label>
        <input type="checkbox" class="nes-checkbox" checked={$currentUser.alwaysAvailable} on:change={handleAlwaysAvailableChange} />
        <span>Available at any time</span>
    </label>
{/if}
