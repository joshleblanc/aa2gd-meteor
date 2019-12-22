<script>
    import List from "./List.svelte";
    import ListItem from "./ListItem.svelte";
    import ListItemAvatar from "./ListItemAvatar.svelte";
    import ListItemText from "./ListItemText.svelte";
    import Avatar from "./Avatar.svelte";
    import ListItemPrimaryText from "./ListItemPrimaryText.svelte";

    export let users = [];
</script>

<List>
    {#each users as user}
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