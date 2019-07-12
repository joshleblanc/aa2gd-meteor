<script>
  import { Link } from 'svelte-routing';
  import { Tracker } from 'meteor/tracker';
  import { onDestroy } from 'svelte';
  import { Meteor } from 'meteor/meteor';
  import ListItem from './ListItem';
  import ListItemAvatar from './ListItemAvatar';
  import Avatar from './Avatar';
  import ListItemText from './ListItemText';


  let user;
  let avatarUrl;
  let discord;
  const computation = Tracker.autorun(() => {
    user = Meteor.user();
    console.log(user);
    discord = user && user.services && user.services.discord;
    if(discord) {
      avatarUrl = `http://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png`;
    }
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
          <Avatar src={avatarUrl} alt="profile picture" />
        </ListItemAvatar>
        <ListItemText>
          {discord && discord.username}
        </ListItemText>
      </ListItem>
    </div>
  </Link>
{/if}