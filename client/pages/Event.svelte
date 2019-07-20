<script>
  import { eventsReady, gamesReady } from '../stores/subscriptionStores';
  import { onDestroy } from 'svelte';
  import { Event } from '/lib/Event';
  import HeaderPaper from '../components/HeaderPaper';
  import Tracker from '../components/Tracker';
  import Button from '../components/Button';
  import { Meteor } from 'meteor/meteor';
  import StyledPaper from '../components/StyledPaper';
  import { User } from '/lib/User';
  import List from '../components/List';
  import ListItem from '../components/ListItem';
  import ListItemText from '../components/ListItemText';
  import ListItemPrimaryText from '../components/ListItemPrimaryText';
  import ListItemAvatar from '../components/ListItemAvatar';
  import Avatar from '../components/Avatar';

  export let id;

  let event;
  let users = [];
  function computation() {
    event = Event.findOne({
      _id: id
    });
    users = event.users().fetch();
  }

  function handleDelete() {
    if(window.confirm("Are you sure?")) {
      event.destroy();
    }
  }

  function handleSignupToggle() {
    event.registerUser(Meteor.userId());
  }
</script>

{#if $eventsReady && $gamesReady}
  <Tracker deps={[id]} fn={computation}>
    <HeaderPaper title={event.name} imgUrl={event.game().iconUrl()} subtitle={event.game().name}>
      {event.date.toLocaleString()}
    </HeaderPaper>
    <StyledPaper title="Actions">
      {#if event.userIds.includes(Meteor.userId())}
        <Button variant="warning" on:click={handleSignupToggle}>Cancel sign up</Button>
      {:else}
        <Button variant="primary" on:click={handleSignupToggle}>Sign up</Button>
      {/if}
      
      {#if event.creatorId === Meteor.userId()}
        <Button variant="error" on:click={handleDelete}>Delete</Button>
      {/if}
    </StyledPaper>
    <StyledPaper title="Users signed up">
      <List>
        {#each users as user}
          <ListItem>
            <ListItemAvatar>
              <Avatar src={user.avatarUrl()} />
            </ListItemAvatar>
            <ListItemText>
              <ListItemPrimaryText>{user.services.discord.username}</ListItemPrimaryText>
            </ListItemText>
          </ListItem>
        {/each}
      </List>
    </StyledPaper>
  </Tracker>
{/if}