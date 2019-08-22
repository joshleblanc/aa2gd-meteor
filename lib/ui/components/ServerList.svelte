<script>
  import FixedHeightList from './FixedHeightList';
  import ServerListItem from './ServerListItem';
  import { Link } from 'svelte-routing';
  import { Server } from '/lib/models/Server';
  import { Tracker } from 'meteor/tracker';
  import { Meteor } from 'meteor/meteor';
  import { User } from '/lib/models/User';
  import { serversReady } from '../stores/subscriptionStores';
  import Loader from './Loader';
  import { onDestroy } from 'svelte';
  import { currentUser } from '../stores/subscriptionStores';
  import { track } from '/lib/utils';
  
  let servers = [];
  track(() => {
    if($currentUser) {
      servers = $currentUser.getServers().fetch();
    }
  });

</script>

<FixedHeightList>
  {#if $serversReady}
    {#each servers as server}
      <Link to="/servers/{server._id}">
        <ServerListItem server={server} />
      </Link>
    {/each}
  {:else}
    <Loader />
  {/if}
</FixedHeightList>
