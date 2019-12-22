<script>
    import { daysOfWeek, times, toUtc } from '/lib/utils';
    import Dialog from './Dialog';
    import List from './List';
    import ListItem from './ListItem';
    import ListItemText from './ListItemText';
    import ListItemPrimaryText from './ListItemPrimaryText';
    import ListItemAvatar from './ListItemAvatar';
    import Avatar from './Avatar';
    import Loader from './Loader';
    import { usersReady } from '../stores/subscriptionStores';

    export let users = [];

    let modalOpen = false;
    let selectedTime;
    let selectedUsers = [];
    let localTime;

    const styles = {};
    const counts = {};

    $: {
      times.forEach(time => {
        daysOfWeek.forEach(day => {
          const utc = toUtc(day, time);
          let count = 0;
          users.forEach(user => {
              if(user.timeTable.includes(utc) || user.alwaysAvailable) {
                  count += 1;
              }
          });
          counts[`${day}${time}`] = count;
          styles[`${day}${time}`] = styleForCount(count);
        });
      });
    }
    
 
    function styleForCount(count) {
        if (count === 0) {
            color = `rgb(100, 0, 0)`;
        } else {
            color = `rgba(0, ${(count / users.length) * 100}, 0, 1)`;
        }
        return `background-color: ${color}`;
    }

    function showAvailableUsers(day, time) {
      selectedTime = toUtc(day, time);
      localTime = `${day} ${time}`;
      selectedUsers = users.filter(u => u.timeTable.includes(selectedTime) || u.alwaysAvailable);
      if(selectedUsers.length > 0) {
        modalOpen = true;
      }
    }
</script>

<!-- I copied this from TimeTable.svelte. 
    should figure out how to share these classes.
    Probably just a component with the styles that renders
    a slot
-->
<style>
  table {
    width: 100%;
    table-layout: fixed;
  }

  td {
    border: 1px solid black;
    display: table-cell;
    padding: 14px 40px 14px 16px;
    font-size: 0.625rem;
    text-align: left;
    font-weight: 400;
    line-height: 1.43;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
    vertical-align: inherit;
  }

  th {
    color: rgba(0, 0, 0, 0.54);
    font-size: 0.5357142857142857rem;
    line-height: 0.9375rem;
    font-weight: 500;
    text-align: center;
  }

  .availability-cell {
    border: 1px solid black;
    color: #dcdcdc;
    text-align: center;
  }
</style>

{#if $usersReady}
  <table>
    <thead>
      <tr>
        <th colspan="2"></th>
        {#each daysOfWeek as day}
          <th align="center">{day}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each times as time}
        <tr>
          <td colspan="2">{time}</td>
          {#each daysOfWeek as day}
            <td 
              class="availability-cell" 
              class:nes-pointer={counts[`${day}${time}`] > 0}
              style={styles[`${day}${time}`]}
              on:click={() => showAvailableUsers(day, time)}
            >
              {counts[`${day}${time}`]}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <Loader />
{/if}

<Dialog open={modalOpen} title="Available users" on:close={() => modalOpen = false}>
  <p>{localTime}</p>
  <List>
    {#each selectedUsers as user}
      <ListItem>
        <ListItemAvatar>
          <Avatar src={user.avatarUrl} />
        </ListItemAvatar>
        <ListItemText>
          <ListItemPrimaryText>{user.services.discord.username}</ListItemPrimaryText>
        </ListItemText>
      </ListItem>
    {/each}
  </List>
</Dialog>
