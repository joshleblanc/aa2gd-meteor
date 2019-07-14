<script>
    import HeaderPaper from '../components/HeaderPaper';
    import { serversReady } from '../stores/subscriptionStores';
    import Loader from '../components/Loader';
    import { Tracker } from 'meteor/tracker';
    import { onDestroy } from 'svelte';
    import { Server } from '/lib/Server';
    import StyledPaper from '../components/StyledPaper';
    import Tabs from '../components/Tabs';

    let server;
    export let id;
    const computation = Tracker.autorun(() => {
        server = Server.findOne({ _id: id });
    });

    onDestroy(() => computation.stop());

    let selectedTab = 0;
</script>

{#if $serversReady}
    <div class="columns">
        <div class="column is-full">
            <HeaderPaper title={server.name} imgUrl={server.avatarUrl()} />
        </div>
        <div class="column is-half-desktop">
            <StyledPaper title="Events">
                <Tabs 
                    tabs={["Current", "Future", "Past"]} 
                    selectedTab={selectedTab} 
                    on:select={e => selectedTab = e.detail}
                />
            </StyledPaper>
        </div>
    </div>
{:else}
    <Loader />
{/if}