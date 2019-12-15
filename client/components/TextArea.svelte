<script>
    import classnames from 'classnames';
    import ErrorText from "./ErrorText.svelte";

    export let label;
    export let value;
    export let fullWidth = false;
    export let ref;
    export let helperText = null;

    const containerClassnames = classnames({
        'full-width': fullWidth
    }, 'nes-field')
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
</style>

<div class="root">
    <div class="{containerClassnames}">
        <label>{label}</label>
        <textarea
                class="nes-textarea"
                on:change
                on:input
                on:click
                bind:this={ref}
        >{value}</textarea>
        {#if helperText}
            <ErrorText>{helperText}</ErrorText>
        {/if}
    </div>

</div>
