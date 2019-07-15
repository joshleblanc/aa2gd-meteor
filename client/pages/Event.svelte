<script>
  import { Tracker } from 'meteor/tracker';
  import { eventsReady } from '../stores/subscriptionStores';
  import { onDestroy } from 'svelte';
  import { Event } from '/lib/Event';
  import HeaderPaper from '../components/HeaderPaper';

  export let id;
  let event;
  const computation = Tracker.autorun(() => {
    event = Event.find({
      _id: event
    })
  });
  $: console.log(event);

  onDestroy(() => computation.stop());

</script>

{#if $eventsReady }
  <HeaderPaper title={event.name}>
  
  </HeaderPaper>
{/if}