<script>
  import ListItem from './ListItem';
  import ListItemAvatar from './ListItemAvatar';
  import ListItemText from './ListItemText';
  import ListItemPrimaryText from './ListItemPrimaryText';
  import Icon from './Icon';
  import { Link } from 'svelte-routing';

  let icon;
  export let connection;

  const getHref = () => {
    switch(connection.type) {
      case 'steam': return `http://steamcommunity.com/profiles/${connection.id}`;
      case 'twitch': return `https://www.twitch.tv/${connection.name}`;
      case 'skype': return `skype:${connection.id}?userinfo`;
      case 'reddit': return `https://reddit.com/u/${connection.name}`;
      case 'facebook': return `https://facebook.com/profile?id=${connection.id}`;
      case 'twitter': return `https://twitter.com/intent/user?user_id=${connection.id}`;
      case 'spotify': return `https://open.spotify.com/user/${connection.id}`;
      case 'youtube': return `https://youtube.com/channel/${connection.id}`;
    }
  }

  let type = connection.type;
  if(connection.type === "battlenet") {
    type = "battle-net";
  }
  
</script>

<a href={getHref()}>
  <ListItem>
    <ListItemAvatar>
      <Icon>
        <i class="fab fa-{type}"></i>
      </Icon>
    </ListItemAvatar>
    <ListItemText>
      <ListItemPrimaryText>{connection.name}</ListItemPrimaryText>
    </ListItemText>

  </ListItem>
</a>
