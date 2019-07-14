<script>
  import { Tracker } from 'meteor/tracker';
  import { User } from '../../lib/User';
  import Connection from './Connection';
  import { onDestroy } from 'svelte';
  export let name;


  let user;
  const computation = Tracker.autorun(() => {
    user = User.current();
  });

  onDestroy(() => computation.stop());
</script>

{#each user.connections as connection}
  <Connection connection={connection} />
{/each}