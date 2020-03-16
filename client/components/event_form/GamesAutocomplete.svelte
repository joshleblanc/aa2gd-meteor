<script>
    import ListItemAvatar from "../ListItemAvatar.svelte";
    import Icon from "../Icon.svelte";
    import Autocomplete from "../autocomplete/Autocomplete.svelte";
    import UserList from "../UserList.svelte";
    import Dialog from '../Dialog';
    import {Game, makeUrl} from '../../../lib/Game';

    export let helperText = "";
    export let selected;
    export let serverId;

    let games = [];
    let userDialogOpen = false;
    let loading = true;
    let search = "";
    let selectedGameId;
    let options = [];

    const dep = new Tracker.Dependency();

    Tracker.autorun(() => {
        dep.depend();
        loading = !Meteor.subscribe('games', search, serverId).ready();
        games = Game.find({}).fetch();
        options = games.map(g => {
            return {
                value: g._id,
                name: g.name,
                // count: counts[g._id],
                image: makeUrl(g.appid, g.img_icon_url)
            }
        });
        console.log(games, search, serverId);
    });

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
    on:change
    placeholder="Select a game"
    loading="{loading}"
    options={options}
>
    <div slot="adornment" let:option={option}>
        {#if serverId}
            <div class="adornment" on:click={e => handleAdornmentClick(e, option.value)}>
                <ListItemAvatar>
                    <Icon>
                        <i class="far fa-user"></i>
                    </Icon>
                </ListItemAvatar>
            </div>
        {/if}
    </div>
</Autocomplete>

<Dialog open={userDialogOpen} on:close={() => userDialogOpen = false} title="Users">
    <UserList users="{User.find({ games: { $elemMatch: { $eq: selectedGameId } }, servers: { $elemMatch: { $eq: selectedServer.value }}}).fetch()}" />
</Dialog>
