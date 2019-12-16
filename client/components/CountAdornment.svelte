<ListItemAvatar>
    {#if option.image}
        <Avatar src={option.image} />
    {:else}
        <Avatar>
            {option.name.split(' ').map(c => c[0].toUpperCase()).join('')}
        </Avatar>
    {/if}
</ListItemAvatar>