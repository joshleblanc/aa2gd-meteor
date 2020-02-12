<script>
  import FixedHeightList from './FixedHeightList';
  import ServerListItem from './ServerListItem';
  import { Link } from 'svelte-routing';
  import { Server } from '../../lib/Server';
  import { Tracker } from 'meteor/tracker';
  import { Meteor } from 'meteor/meteor';
  import { User } from '/lib/User';
  import { serversReady } from '../stores/subscriptionStores';
  import Loader from './Loader';
  import { onDestroy } from 'svelte';

  let servers = [];
  const computation = Tracker.autorun(() => {
    const user = User.current();
    if(user) {
      servers = user.getServers().fetch();
    }
  });

  onDestroy(() => {
    computation.stop();
  });

</script>

<FixedHeightList>
  {#each servers as server}
    <Link to="/servers/{server._id}">
      <ServerListItem server={server} />
    </Link>
  {/each}
</FixedHeightList>
