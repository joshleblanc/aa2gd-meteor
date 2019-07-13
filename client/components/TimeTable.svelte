<script>
  import moment from 'moment';
  import { Tracker } from 'meteor/tracker';
  import { User } from '../../lib/User';
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const times = [];
  for (let i = 0; i < 24; i++) {
    times.push(`${i}:00`);
  }

  let user;
  let timeTable;
  const computation = Tracker.autorun(() => {
    user = User.current();
    if(user) {
      timeTable = user.timeTable;
    }
  });

  function handleClick(day, time) {
    user.toggleAvailableTime(toUtc(day, time));
  }

  function toUtc(day, time) {
    const t = moment(time, 'HH:mm');
    t.set('day', day);
    t.utc();
  
    return `${daysOfWeek[t.day()]} ${t.format('HH:mm')}`;
  }

</script>


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
  }
</style>

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
          <td on:click={() => handleClick(day, time)} style="background-color: {user.timeTable.includes(toUtc(day, time)) ? 'green' : 'red'}"></td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>