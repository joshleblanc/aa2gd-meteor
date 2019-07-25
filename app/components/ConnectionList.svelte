<script>
  import { Tracker } from 'meteor/tracker';
  import { User } from '../../lib/User';
  import Connection from './Connection';
  import { onDestroy } from 'svelte';
  import FixedHeightList from './FixedHeightList';

  export let name;

  let user;
  const computation = Tracker.autorun(() => {
    user = User.current();
  });

  onDestroy(() => computation.stop());
</script>

<FixedHeightList>
  {#each user.connections as connection}
    <Connection connection={connection} />
  {/each}
</FixedHeightList>
