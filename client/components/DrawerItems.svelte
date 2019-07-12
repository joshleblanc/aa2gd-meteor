<script>
  import CurrentUserDisplay from './CurrentUserDisplay';
  import Divider from './Divider';
  import { Tracker } from 'meteor/tracker';
  import { onDestroy } from 'svelte';
  import { Meteor } from 'meteor/meteor';
  import List from './List';
  import ListItemText from './ListItemText';
  import ListItem from './ListItem';
  
  let events = [];
  const computation = Tracker.autorun(() => {
    // subscribe to events
  });

  onDestroy(() => {
    computation.stop();
  });

</script>

<style>
  .divider {
    background-color: black;
  }
</style>

<CurrentUserDisplay />
<Divider />
<List>
  {#if events.length === 0}
    <ListItem>
      <ListItemText>
        No events have been created!
      </ListItemText>
    </ListItem>
  {/if}
</List>
