<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import Button from './Button';
    export let title = "";
    export let open = false;

    const dispatch = createEventDispatcher();

    function forward() {
        dispatch('close');
    }

</script>

<style>
    .modal-card-head {
        border-bottom: 1px solid black;
        background-color: white;
    }

    .nes-container {
        background-color: white;
        padding: 0;
        min-height: calc(100vh - 40px);
    }

    footer {
        background-color: white;
        border-top: 1px solid black;
        display: flex;
        justify-content: flex-end;
    }
    
    .modal {
        z-index: 1400;
    }

    section {
        height: 100%;
    }
</style>

{#if open}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card nes-container" transition:fly="{{duration: 150, x: 0, y: 500 }}">
            <header class="modal-card-head">
                <p class="modal-card-title">{title}</p>
            </header>
            <section class="modal-card-body">
                <slot></slot>
            </section>
            <footer class="modal-card-foot dialog-menu">
                <Button on:click={forward}>Close</Button>
            </footer>
        </div>
    </div>
{/if}