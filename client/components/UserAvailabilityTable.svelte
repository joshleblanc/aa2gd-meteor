<script>
    import { daysOfWeek, times, toUtc } from '/lib/utils';
    export let users = [];
    console.log(users);

    const max = users.length;
    function styleForTime(day, time) {
        const count = countUsers(day, time);
        if (count === 0) {
            color = `rgb(100, 0, 0)`;
        } else {
            color = `rgba(0, ${(count / max) * 100}, 0, 1)`;
        }
        return `background-color: ${color}`;
    }

    function countUsers(day, time) {
        const utc = toUtc(day, time);
        let count = 0;
        users.forEach(user => {
            if(user.timeTable.includes(utc)) {
                count += 1;
            }
        });
        return count;
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
          <td class="availability-cell" style={styleForTime(day, time)}>{countUsers(day, time)}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

