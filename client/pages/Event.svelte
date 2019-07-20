<script>
  import { eventsReady, gamesReady } from '../stores/subscriptionStores';
  import { onDestroy } from 'svelte';
  import { Event } from '/lib/Event';
  import HeaderPaper from '../components/HeaderPaper';
  import Tracker from '../components/Tracker';
  import Button from '../components/Button';
  import { Meteor } from 'meteor/meteor';
  import StyledPaper from '../components/StyledPaper';

  export let id;

  let event;
  function computation() {
    event = Event.findOne({
      _id: id
    });
  }

  function handleDelete() {
    if(window.confirm("Are you sure?")) {
      event.destroy();
    }
  }

  function handleSignupToggle() {

  }
</script>

{#if $eventsReady && $gamesReady}
  <Tracker deps={[id]} fn={computation}>
    <HeaderPaper title={event.name} imgUrl={event.game().iconUrl()} subtitle={event.game().name}>
      {event.date.toLocaleString()}
    </HeaderPaper>
    <StyledPaper title="Actions">
      <Button variant="primary" on:click={handleSignupToggle}>RSVP</Button>
      {#if event.creatorId === Meteor.userId()}
        <Button variant="error" on:click={handleDelete}>Delete</Button>
      {/if}
    </StyledPaper>
    <StyledPaper title="Users">
    </StyledPaper>
  </Tracker>
{/if}