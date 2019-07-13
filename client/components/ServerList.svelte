<script>
  import FixedHeightList from './FixedHeightList';
  import ServerListItem from './ServerListItem';
  import { Link } from 'svelte-routing';
  import { Server } from '../../lib/Server';
  import { Tracker } from 'meteor/tracker';
  import { Meteor } from 'meteor/meteor';
  import { User } from '/lib/User';
  
  let servers = [];
  const computation = Tracker.autorun(() => {
    Meteor.subscribe('servers');
    const user = User.findOne({ _id: Meteor.userId });
    servers = Server.find({
      _id: {
        $in: user.servers
      }
    }).fetch();
  });

</script>

<FixedHeightList height={522}>
  {#each servers as server}
    <Link to="/servers/{server._id}">
      <ServerListItem server={server} />
    </Link>
  {/each}
</FixedHeightList>
