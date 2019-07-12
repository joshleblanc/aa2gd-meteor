<script>
  import FixedHeightList from './FixedHeightList';
  import ServerListItem from './ServerListItem';
  import { Link } from 'svelte-routing';
  import { Server } from '../../lib/Server';
  import { Tracker } from 'meteor/tracker';
  
  let servers = [];
  const computation = Tracker.autorun(() => {
    servers = Server.find({}).fetch();
  });

</script>

<FixedHeightList height={522}>
  {#each servers as server}
    <Link to="/servers/{server._id}">
      <ServerListItem server={server} />
    </Link>
  {/each}
</FixedHeightList>
