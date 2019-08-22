<script>
  import { Link } from 'svelte-routing';
  import { Tracker } from 'meteor/tracker';
  import { onDestroy } from 'svelte';
  import { Meteor } from 'meteor/meteor';
  import ListItem from './ListItem';
  import ListItemAvatar from './ListItemAvatar';
  import Avatar from './Avatar';
  import ListItemText from './ListItemText';
  import ListItemPrimaryText from './ListItemPrimaryText';
  import { User } from '/lib/models/User';

  let user;
  const computation = Tracker.autorun(() => {
    user = User.current();
  });

  onDestroy(() => {
    computation.stop();
  });
</script>

<style>
  .container {
    min-height: 64px;
  }
</style>

{#if user}
  <Link to="/profile">
    <div class="container">
      <ListItem>
        <ListItemAvatar>
          <Avatar src={user.avatarUrl()} alt="profile picture" />
        </ListItemAvatar>
        <ListItemText>
          <ListItemPrimaryText>{user.services.discord.username}</ListItemPrimaryText>
        </ListItemText>
      </ListItem>
    </div>
  </Link>
{/if}