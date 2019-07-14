<script>
    import { createEventDispatcher } from 'svelte';
    export let selectedTab;
    export let tabs = [];

    const dispatch = createEventDispatcher();
</script>

<style>
    ul {
        margin: 0;
    }
</style>

<div class="tabs is-fullwidth">
    <ul>   
        {#each tabs as tab, i}
            <li class={selectedTab === i && "is-active"} on:click={() => dispatch('select', i) }>
                <a>
                    <span>{tab}</span>
                </a>
            </li>
        {/each}
    </ul>
</div>