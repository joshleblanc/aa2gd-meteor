<script>
  import { Tracker } from 'meteor/tracker';
  import { User } from '/lib/models/User';
  import Connection from './Connection';
  import { onDestroy } from 'svelte';
  import FixedHeightList from './FixedHeightList';
  import { currentUser } from '../stores/subscriptionStores';
  export let name;

</script>

{#if $currentUser}
  <FixedHeightList>
    {#each $currentUser.connections as connection}
      <Connection connection={connection} />
    {/each}
  </FixedHeightList>
{/if}
