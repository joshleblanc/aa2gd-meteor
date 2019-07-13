<script>
    import TextField from './TextField';
    import Dialog from './Dialog';

    let open = false;

    $: console.log(open);
</script>

<style>
    .time {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        font-size: 7em;
    }
</style>

<TextField on:click={() => open = true}/>

<Dialog open={open} title="Pick a time" on:close={() => open = false}>
    <div class="time">
        <span>10</span>:<span>00</span>
    </div>
    
</Dialog>