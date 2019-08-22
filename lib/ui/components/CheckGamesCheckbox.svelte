<script>
  import { User } from '/lib/models/User';
  import { track } from '/lib/utils';
  import { currentUser } from '../stores/subscriptionStores';

  function handleCheckGamesChange() {
      $currentUser.toggleCheckGames();
  }
</script>

{#if $currentUser}
    <label>
        <input type="checkbox" class="nes-checkbox" checked={!$currentUser.checkGames} on:change={handleCheckGamesChange} />
        <span>Include unowned games</span>
    </label>
{/if}
