<script>
    import ListItemAvatar from "../ListItemAvatar.svelte";
    import Icon from "../Icon.svelte";
    import Autocomplete from "../autocomplete/Autocomplete.svelte";
    import UserList from "../UserList.svelte";
    import Dialog from '../Dialog';
    import {Game, makeUrl} from '../../../lib/Game';
    import { User } from '../../../lib/User';
    import { createEventDispatcher } from 'svelte';

    export let helperText = "";
    export let selected;
    export let serverId;

    const dispatch = createEventDispatcher();

    let games = [];
    let userDialogOpen = false;
    let loading = true;
    let search = "";
    let selectedGameId;
    let options = [];
    let users = [];

    let searchHandle;

    const dep = new Tracker.Dependency();
    const counts = {};

    $: {
        serverId;
        if(searchHandle) {
            clearTimeout(searchHandle);
        }

        searchHandle = setTimeout(() => {
            Tracker.autorun(() => {
                console.log("Inner tracker running");
                loading = !Meteor.subscribe('games', search, serverId).ready();
            })
        }, 600);
    }

    Tracker.autorun(() => {
        console.log("Tracker running");
        dep.depend();

        games = Game.find({}).fetch();
        users = User.find({}).fetch();

        games.forEach(g => {
            counts[g._id] = gameUsers(serverId, g._id);
        });

        options = games.map(g => {
            return {
                value: g._id,
                name: g.name,
                count: counts[g._id],
                image: makeUrl(g.appid, g.img_icon_url)
            }
        });
    });


    const gameUsers = (serverId, gameId) => {
        return users.filter(u => u.games.some(g => g.equals(gameId)) && u.servers.some(s => s.equals(serverId))).length;
    };

    function handleSearchChange(e) {
      search = e.detail;
      dep.changed();
    }

    function handleAdornmentClick(e, id) {
      e.stopPropagation();
      selectedGameId = id;
      userDialogOpen = true;
    }

</script>

<style>
    .adornment {
        height: 40px;
        display: flex;
        align-content: center;
        align-items: center;
        padding: 8px;
    }

    .adornment:hover {
        background-color: rgba(0,0,0,0.08);
    }
</style>

<Autocomplete
    fullWidth
    label="Game"
    helperText={helperText}
    selected={selected}
    on:searchChange={handleSearchChange}
    on:change="{e => dispatch('change', e.detail)}"
    sortingFn={(a,b) => counts[b.value] !== undefined && counts[a.value] !== undefined ? counts[b.value] - counts[a.value] : 0}
    placeholder="Select a game"
    loading="{loading}"
    options={options}
>
    <div slot="adornment" let:option="{option}">
        {#if serverId}
            <div class="adornment" on:click={e => handleAdornmentClick(e, option.value)}>
                <ListItemAvatar>
                    <Icon>
                        <i class="far fa-user"></i>
                    </Icon>
                    {counts[option.value]}
                </ListItemAvatar>
            </div>
        {/if}
    </div>
</Autocomplete>

<Dialog open={userDialogOpen} on:close={() => userDialogOpen = false} title="Users">
    <UserList users="{User.find({ games: { $elemMatch: { $eq: selectedGameId } }, servers: { $elemMatch: { $eq: serverId }}}).fetch()}" />
</Dialog>
