<script>
    import StyledPaper from './StyledPaper';
    import Tracker from './Tracker';
    import Tabs from './Tabs';
    import EventList from './EventList';
    import Loader from './Loader';
    import { eventsReady } from '../stores/subscriptionStores';
    
    export let events;

    let selectedTab = 0;
    const now = new Date();
    const currentCutoff = new Date();
    currentCutoff.setHours(currentCutoff.getHours() - 3);
</script>


{#if $eventsReady}
    <StyledPaper title="Events">
        <Tabs 
            tabs={["Current", "Future", "Past"]} 
            selectedTab={selectedTab} 
            on:select={e => selectedTab = e.detail}
        />
        {#if selectedTab === 0}
            <EventList events={events.filter(event => event.date < now && event.date > currentCutoff)} />
        {:else if selectedTab === 1}
            <EventList events={events.filter(event => event.date > now)}/>
        {:else}
            <EventList events={events.filter(event => event.date < now && event.date <= currentCutoff )}/>
        {/if}
    </StyledPaper>
{:else}
    <Loader />
{/if}
