<script>
  import List from './List';
  import ListItem from './ListItem';
  import ListItemAvatar from './ListItemAvatar';
  import ListItemText from './ListItemText';
  import ListItemPrimaryText from './ListItemPrimaryText';
  import ListItemSecondaryText from './ListItemSecondaryText';
  import Avatar from './Avatar'; 
  import { eventsReady, gamesReady } from '../stores/subscriptionStores';
  import { Tracker } from 'meteor/tracker';
  import { onDestroy } from 'svelte';
  import Loader from './Loader';
  import FixedHeightList from './FixedHeightList';
  import { Link } from 'svelte-routing';
  import ListItemTertiaryText from './ListItemTertiaryText';
  import moment from 'moment';
  import { format } from '../constants';

  export let events = [];
</script>


<FixedHeightList>
  {#if $eventsReady && $gamesReady }
      {#if events.length === 0}
        <p>No events</p>
      {:else}
          {#each events as event}
            <Link to={`/events/${event._id.toHexString()}`}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={event.game().iconUrl()} />
                </ListItemAvatar>
                <ListItemText>
                  <ListItemPrimaryText>{event.name}</ListItemPrimaryText>
                  <ListItemSecondaryText>{event.game().name}</ListItemSecondaryText>
                  <ListItemTertiaryText>{moment(event.date).format(format)}</ListItemTertiaryText>
                </ListItemText>
              </ListItem>
            </Link>
          {/each}
      {/if}
  {:else}
    <Loader />
  {/if}
</FixedHeightList>

