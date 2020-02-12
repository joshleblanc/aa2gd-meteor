<script>
    import HeaderPaper from '../components/HeaderPaper';
    import { serversReady, usersReady, eventsReady } from '../stores/subscriptionStores';
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
    import EventsPaper from '../components/EventsPaper';

    let server;
    let events = [];
    let users = [];
    let webhookDialogOpen = false;
    export let id;
    const computation = Tracker.autorun(() => {
        if(id) {
            server = Server.findOne({ _id: new Mongo.ObjectID(id) });
            if(server) {
                events = server.events({ limit: 30, sort: { date: 1 } }).fetch();
                users = server.users().fetch();
            }
        }

    });

    onDestroy(() => computation.stop());

    let selectedTab = 0;

    const now = new Date();
    const currentCutoff = new Date();
    currentCutoff.setHours(currentCutoff.getHours() + 3);
</script>

<HeaderPaper title={server.name} imgUrl={server.avatarUrl()} />
<StyledPaper title="Actions">
    <Button on:click={() => webhookDialogOpen = true}>Manage Webhooks</Button>
</StyledPaper>
<div class="columns is-multiline">
    <div class="column">
        <EventsPaper events={events} />
    </div>
    <div class="column">
        <StyledPaper title="User availability">
            <UserAvailabilityTable users={users}/>
        </StyledPaper>
    </div>
</div>
<WebhookDialog open={webhookDialogOpen} on:close={() => webhookDialogOpen = false} serverId={server._id} />
