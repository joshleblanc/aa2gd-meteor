<script>
  import { Link } from 'svelte-routing';
  import { Tracker } from 'meteor/tracker';
  import { onDestroy } from 'svelte';
  import { Meteor } from 'meteor/meteor';

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
    padding-left: 16px;
    padding-right: 16px;
    width: 100%;
    display: flex;
    position: relative;
    box-sizing: border-box;
    text-align: left;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 8px;
    justify-content: flex-start;
    text-decoration: none;
  }

  .avatar {
    min-width: 56px;
    flex-shrink: 0;
  }

  .avatar-root {
    width: 40px;
    height: 40px;
    display: flex;
    position: relative;
    overflow: hidden;
    font-size: 0.8928571428571429rem;
    align-items: center;
    flex-shrink: 0;
    user-select: none;
    border-radius: 50%;
    justify-content: center;
  }

  .avatar-root > img {
    width: 100%;
    height: 100%;
    text-align: center;
    object-fit: cover;
  }

  .text {
    flex: 1 1 auto;
    min-width: 0;
    margin-top: 4px;
    margin-bottom: 4px;
  }
</style>

{#if user}
  <Link to="/profile">
    <div class="container">
      <div class="avatar">
        <div class="avatar-root">
          <img src={avatarUrl}>
        </div>
      </div>
      <div class="text">
        <span>{discord && discord.username}</span>
      </div>
    </div>
  </Link>
{/if}