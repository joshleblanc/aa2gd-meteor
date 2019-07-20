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

  export let events = [];
</script>


<FixedHeightList>
  {#if $eventsReady && $gamesReady }
      {#if events.length === 0}
        <p>No events</p>
      {:else}
          {#each events as event}
            <ListItem>
              <ListItemAvatar>
                <Avatar src={event.game().iconUrl()} />
              </ListItemAvatar>
              <ListItemText>
                <ListItemPrimaryText>{event.name}</ListItemPrimaryText>
                <ListItemSecondaryText>{event.game().name}</ListItemSecondaryText>
              </ListItemText>
            </ListItem>
          {/each}
      {/if}
  {:else}
    <Loader />
  {/if}
</FixedHeightList>

