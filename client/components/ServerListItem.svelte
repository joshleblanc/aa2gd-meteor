<script>
  import ListItem from './ListItem';
  import ListItemAvatar from './ListItemAvatar';
  import ServerAvatar from './ServerAvatar';
  import ListItemText from './ListItemText';
  import ListItemPrimaryText from './ListItemPrimaryText';
  import ListItemSecondaryText from './ListItemSecondaryText';
  export let server;
</script>

<style>
  span {
    display: block;
  }
</style>

<ListItem>
  <ListItemAvatar>
    <ServerAvatar server={server} />
  </ListItemAvatar>
  <ListItemText>
    <ListItemPrimaryText>{server.name}</ListItemPrimaryText>
    <ListItemSecondaryText>
      <span>0 ongoing</span>
      0 upcoming
    </ListItemSecondaryText>
  </ListItemText>
</ListItem>