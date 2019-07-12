<script>
  import { Tracker } from 'meteor/tracker';
  import { User } from '../../lib/User';
  import Connection from './Connection';

  export let name;


  let user;
  const computation = Tracker.autorun(() => {
    user = User.current();
  });
</script>

{#each user.connections as connection}
  <Connection connection={connection} />
{/each}