<script>
  import { eventsReady, gamesReady, serversReady } from '../stores/subscriptionStores';
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
  import { navigate } from 'svelte-routing';
  import { format } from '../constants';
  import { Link } from 'svelte-routing';
  import moment from 'moment';
  import Loader from '../components/Loader';

  export let id;

  let event;
  let users = [];
  let momentDate;
  let duration;

  function computation() {
    Meteor.subscribe('event', new Mongo.ObjectID(id)).ready();
    event = Event.findOne({
      _id: new Mongo.ObjectID(id)
    });
    momentDate = moment(event.date);
    users = event.users().fetch();
    duration = moment.duration(momentDate.diff(moment()));
  }

  function handleDelete() {
    if(window.confirm("Are you sure?")) {
      event.destroy();
      navigate('/profile', { replace: true });
    }
  }

  function handleSignupToggle() {
    event.registerUser(Meteor.userId());
  }

</script>

{#if $eventsReady && $gamesReady && $serversReady}
  <Tracker deps={[id]} fn={computation}>
    <StyledPaper title={event.name}>
      <Link to={`/servers/${event.server()._id.toHexString()}`}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={event.server().avatarUrl()} />
          </ListItemAvatar>
          <ListItemText>
            <ListItemPrimaryText>{event.server().name}</ListItemPrimaryText>
          </ListItemText>
        </ListItem>
      </Link>
      <ListItem noHover>
        <ListItemAvatar>
          <Avatar src={event.game().iconUrl()} />
        </ListItemAvatar>
        <ListItemText>
          <ListItemPrimaryText>{event.game().name}</ListItemPrimaryText>
        </ListItemText>
      </ListItem>
      <ListItem noHover>
        <ListItemText>{momentDate.format(format)}</ListItemText>
      </ListItem>
      <ListItem noHover>
        <ListItemText>
          {#if duration.seconds() > 0}
            Begins
          {:else if duration.hours() > -3}
            Began
          {:else}
            Ended
          {/if}
          {duration.humanize(true)}</ListItemText>
      </ListItem>
    </StyledPaper>
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
{:else}
  <Loader />
{/if}
