<script>
    import { fade, fly } from 'svelte/transition';
    import Loader from './Loader';
    import { populatingUserData, loggingIn } from '../stores/state';

    let outOpts = {y: 1080, duration: 1000};
    let inOpts = {y: -100, duration: 1000};
</script>


<style>
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0,0,0, 0.5);
        z-index: 99999999;
    }

    .content {
        left: calc(50% - 150px);
        top: 50%;
        position: absolute;
        max-width: 300px;
        min-width: 300px;
    }

    .nes-container {
        background-color: white;
    }
</style>

{#if $populatingUserData || $loggingIn}
    <div class="overlay" transition:fade>
        <div class="content">
            {#if $populatingUserData}
                <div in:fly={inOpts} out:fly={outOpts} class="nes-container is-rounded">
                    <p>Gathering information...</p>
                    <Loader />
                </div>
            {/if}
            {#if $loggingIn}
                <div in:fly={inOpts} out:fly={outOpts} class="nes-container is-rounded">
                    <p>Waiting...</p>
                </div>
            {/if}
            
        </div>
    </div>
{/if}
