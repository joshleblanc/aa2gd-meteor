<script>
    import { createEventDispatcher } from 'svelte';
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

    

    const dispatcher = createEventDispatcher();

    function forward() {
        dispatcher('close');
    }

    let search = "";
    $: console.log(search);
    let className;
    let filteredOptions = [];
    $: {
        className = classnames({
            'is-active': open
        }, 'modal');

        const limit = 25;
        const selectedOptions = options.filter(o => o.name.toLowerCase().startsWith(search.toLowerCase()));
        filteredOptions = selectedOptions.slice(0, limit);
    }

    function selectItem(option) {
        if(option && option.value) {
            dispatcher('select', option.value)
            dispatcher('close');
            search = "";
        }
    }

</script>

<style>
    .list-container {
        display: flex;
        flex-direction: column;
    }

    .modal {
        z-index: 1400;
    }

    section {
        height: 100%;
    }

    .list-container {
        height: 100%;
        overflow-y: auto;
    }

    .modal-card-head {
        border-bottom: 1px solid black;
        background-color: white;
    }

    .nes-container {
        background-color: white;
        padding: 0;
    }

    footer {
        background-color: white;
        border-top: 1px solid black;
        display: flex;
        justify-content: flex-end;
    }
</style>

<div class={className}>
    <div class="modal-background"></div>
    <div class="modal-card nes-container">
        <header class="modal-card-head">
            <p class="modal-card-title">{title}</p>
        </header>
        <section class="modal-card-body">
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
        </section>
        <footer class="modal-card-foot dialog-menu">
            <Button on:click={forward}>Cancel</Button>
        </footer>
    </div>
</div>