<script>
    import ErrorText from './ErrorText';
    import classnames from 'classnames';
    import { createEventDispatcher } from 'svelte';
    export let inline = false;
    export let fullWidth = false;
    export let variant = null;
    export let label = "";
    export let adornment = null;
    export let helperText = null;
    export let disabled = false;
    export let value = "";
    export let type = "text";
    export let readonly = false;

    const dispatcher = createEventDispatcher();

    function forward(e) {
        console.log("pwkemf");
        dispatcher('click', e);
    }

    const containerClassnames = classnames({
        'is-inline': inline,
        'full-width': fullWidth,
    }, 'nes-field');

    const inputClassnames = classnames({
        [`is-${variant}`]: !!variant
    }, 'nes-input');
</script>

<style>
    .root {
        margin: 8px;
        display: flex;
        text-align: left;
    }

    .full-width {
        width: 100%;
    }

    .children {
        display: flex;
    }

    input {
        font-family: "Press Start 2P",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    }
    
</style>

<div class="root">
    <div class="{containerClassnames}">
        <label>{label}</label>
        <div class="children">
            <input readonly={readonly} type={type} class="{inputClassnames}" disabled={disabled} value={value} on:change on:click />
            {#if adornment}
                <svelte:component this={adornment} on:click={forward}/>
            {/if}
        </div>  
        {#if helperText}
            <ErrorText>{helperText}</ErrorText>
        {/if}
    </div>
</div>