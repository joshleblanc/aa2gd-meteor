<script>
    import HeaderPaper from '../components/HeaderPaper';
    import { serversReady, usersReady } from '../stores/subscriptionStores';
    import Loader from '../components/Loader';
    import { Tracker } from 'meteor/tracker';
    import { onDestroy } from 'svelte';
    import { Server } from '/lib/Server';
    import StyledPaper from '../components/StyledPaper';
    import Tabs from '../components/Tabs';
    import UserAvailabilityTable from '../components/UserAvailabilityTable';
    import EventList from '../components/EventList';
    import Button from '../components/Button';
    import WebhookDialog from '../components/WebhookDialog';

    let server;
    let webhookDialogOpen = false;
    export let id;
    const computation = Tracker.autorun(() => {
        server = Server.findOne({ _id: id });
    });

    onDestroy(() => computation.stop());

    let selectedTab = 0;

    const now = new Date();
    const currentCutoff = new Date();
    currentCutoff.setHours(currentCutoff.getHours() + 3);

</script>

{#if $serversReady}
    <div class="columns is-multiline">
        <div class="column is-full">
            <HeaderPaper title={server.name} imgUrl={server.avatarUrl()}>
                <Button on:click={() => webhookDialogOpen = true }>Webhooks</Button>
            </HeaderPaper>
        </div>
        <div class="column is-half-desktop">
            <StyledPaper title="Events">
                <Tabs 
                    tabs={["Current", "Future", "Past"]} 
                    selectedTab={selectedTab} 
                    on:select={e => selectedTab = e.detail}
                />
                {#if selectedTab === 0}
                    <EventList server={server} filter={event => event.date < now && event.date > currentCutoff} />
                {:else if selectedTab === 1}
                    <EventList server={server} filter={event => event.date > currentCutoff }/>
                {:else}
                    <EventList server={server} filter={event => event.date < now }/>
                {/if}
            </StyledPaper>
        </div>
        <div class="column is-half-desktop">
            <StyledPaper title="User availability">
                {#if $usersReady}
                    <UserAvailabilityTable users={server.users().fetch()}/>
                {:else}
                    <Loader />
                {/if}
            </StyledPaper>
        </div>
    </div>
    <WebhookDialog open={webhookDialogOpen} on:close={() => webhookDialogOpen = false} serverId={server._id} />
{:else}
    <Loader />
{/if}