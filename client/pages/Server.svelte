<script>
    import HeaderPaper from '../components/HeaderPaper';
    import { serversReady } from '../stores/subscriptionStores';
    import Loader from '../components/Loader';
    import { Tracker } from 'meteor/tracker';
    import { onDestroy } from 'svelte';
    import queryString from 'query-string';
    import { Server } from '/lib/Server';

    let server;
    export let id;
    $: console.log(id);
    const query = queryString.parse(window.location.search);
    $: console.log(query);
    const computation = Tracker.autorun(() => {
        server = Server.findOne({ _id: id });
    });

    onDestroy(() => computation.stop());
</script>

{#if $serversReady}
    <div class="columns">
        <div class="column is-full">
            <HeaderPaper title={server.name} imgUrl={server.avatarUrl()} />
        </div>
    </div>
{:else}
    <Loader />
{/if}