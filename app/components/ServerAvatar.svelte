<script>
  import Avatar from './Avatar';
  export let server;
</script>

{#if server.icon}
  <Avatar src={server.avatarUrl()} alt={server.name} />
{:else}
  <Avatar>{server.name.split(' ').map(c => c[0].toUpperCase()).join('')}</Avatar>
{/if}