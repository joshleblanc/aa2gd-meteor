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
    export let multiple = false;
    export let selected = [];

    const dispatch = createEventDispatcher();

    let search = "";
    let filteredOptions = [];
    $: {
        const limit = 10;
        const selectedOptions = options.filter(o => o.name && o.name.toLowerCase().startsWith(search.toLowerCase()));
        filteredOptions = selectedOptions.slice(0, limit);
    }

    function selectItem(option) {
        if(option && option.value) {
            dispatch('change', option.value)
            if(!multiple) {
              dispatch('close');
              search = "";
            }

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
        <TextField on:input={e => search = e.target.value} value={search} fullWidth autoFocus/>
        <p>Type something to search</p>
        <div class="list-container">
            <List>
                {#each filteredOptions as option}
                    <ListItem on:click={() => selectItem(option)} selected={multiple && selected.map(s => s.value).includes(option.value)}>
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
                        <slot option="{option}" name="adornment" />
                    </ListItem>
                {/each}
            </List>
        </div>
    </div>
</Dialog>
