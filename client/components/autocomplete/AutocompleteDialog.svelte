<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import Dialog from '../Dialog';
    import TextField from '../TextField';
    import classnames from 'classnames';
    import List from '../List';
    import ListItem from '../ListItem';
    import ListItemAvatar from '../ListItemAvatar';
    import ListItemText from '../ListItemText';
    import ListItemPrimaryText from '../ListItemPrimaryText';
    import Avatar from '../Avatar';
    import Button from '../Button';

    export let title = "";
    export let open = false;
    export let options = [];

    const dispatch = createEventDispatcher();

    let search = "";
    let filteredOptions = [];
    $: {
        const limit = 25;
        const selectedOptions = options.filter(o => o.name.toLowerCase().startsWith(search.toLowerCase()));
        filteredOptions = selectedOptions.slice(0, limit);
    }

    function selectItem(option) {
        if(option && option.value) {
            dispatch('select', option.value)
            dispatch('close');
            search = "";
        }
    }

</script>

<style>
    .list-container {
        display: flex;
        flex-direction: column;
    }

    .list-container {
        height: 100%;
        overflow-y: auto;
    }
</style>

<Dialog open={open} title={title} on:close>
    <div class="list-container">
        <TextField bind:value={search} />
        <p>Type something to search</p>
        <div class="list-container">
            <List>
                {#each filteredOptions as option}
                    <ListItem on:click={() => selectItem(option)}>
                        <ListItemAvatar>
                            <ListItemAvatar>
                                {#if option.image}
                                    <Avatar src={option.image} />
                                {:else}
                                    <Avatar>
                                        {option.name.split(' ').map(c => c[0].toUpperCase()).join('')}
                                    </Avatar>
                                {/if}
                            </ListItemAvatar>
                        </ListItemAvatar>
                        <ListItemText>
                            <ListItemPrimaryText>{option.name}</ListItemPrimaryText>
                        </ListItemText>
                    </ListItem>
                {/each}
            </List>
        </div>
    </div>
</Dialog>