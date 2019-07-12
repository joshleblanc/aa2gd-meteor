<script>
  import CurrentUserDisplay from './CurrentUserDisplay';
  import Divider from './Divider';
  import { Tracker } from 'meteor/tracker';
  import { onDestroy } from 'svelte';
  import { Meteor } from 'meteor/meteor';
  import List from './List';
  import ListItemText from './ListItemText';
  import ListItem from './ListItem';
  import ListItemPrimaryText from './ListItemPrimaryText';
  let events = [];
  const computation = Tracker.autorun(() => {
    // subscribe to events
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
  {/if}
</List>
