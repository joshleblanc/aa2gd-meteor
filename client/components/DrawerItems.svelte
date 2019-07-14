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
  import ListItemTertiaryText from './ListItemTertiaryText';
  import ServerListItem from './ServerListItem';
  import ListItemAvatar from './ListItemAvatar';
  import Avatar from './Avatar';
  import { Link } from 'svelte-routing';
  import Loader from './Loader';


  let events = [];
  let gameHandle;
  let serverHandle;
  let eventHandle;
  let ready = false;

  const computation = Tracker.autorun(() => {
    const user = User.current();
    gameHandle = Meteor.subscribe('games', user.games);
    serverHandle = Meteor.subscribe('servers', user.servers);
    eventHandle = Meteor.subscribe('events', user.servers);

    ready = gameHandle.ready() && serverHandle.ready() && eventHandle.ready();
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
  {#if ready}
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
              <ListItemTertiaryText>{event.date.toLocaleString()}</ListItemTertiaryText>
            </ListItemText>
          </ListItem>
        </Link>
      {/each}
    {/if}
  {:else}
    <Loader />
  {/if}
</List>
