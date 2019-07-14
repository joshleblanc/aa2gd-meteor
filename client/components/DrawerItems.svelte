<script>
  import CurrentUserDisplay from './CurrentUserDisplay';
  import Divider from './Divider';
  import { Tracker } from 'meteor/tracker';
  import { onDestroy } from 'svelte';
  import { Meteor } from 'meteor/meteor';
  import { User } from '/lib/User';
  import { Event } from '/lib/Event';
  import List from './List';
  import ListItemText from './ListItemText';
  import ListItem from './ListItem';
  import ListItemPrimaryText from './ListItemPrimaryText';
  import ListItemSecondaryText from './ListItemSecondaryText';
  import ServerListItem from './ServerListItem';
  import ListItemAvatar from './ListItemAvatar';
  import Avatar from './Avatar';
  import { Link } from 'svelte-routing';


  let events = [];
  const computation = Tracker.autorun(() => {
    const user = User.current();
    Meteor.subscribe('games', user.games);
    Meteor.subscribe('servers', user.servers);
    Meteor.subscribe('events', user.servers);
    events = Event.find({
      serverId: {
        $in: user.servers
      }
    }).fetch();
  });

  onDestroy(() => {
    computation.stop();
  });

</script>

<CurrentUserDisplay />
<Divider />
<List>
  {#if events.length === 0}
    <ListItem>
      <ListItemText>
        <ListItemPrimaryText>No events have been created!</ListItemPrimaryText>
      </ListItemText>
    </ListItem>
  {:else}
    {#each events as event}
      <Link to={`/events/${event._id}`}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={event.game().iconUrl()}></Avatar>
          </ListItemAvatar>
          <ListItemText>
            <ListItemPrimaryText>{event.name}</ListItemPrimaryText>
            <ListItemSecondaryText>{event.server().name}</ListItemSecondaryText>
          </ListItemText>
        </ListItem>
      </Link>
    {/each}
  {/if}
</List>
