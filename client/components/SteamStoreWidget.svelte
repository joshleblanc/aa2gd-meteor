<script>
    export let appid;
</script>

<style>
    iframe {
        width: 100%;
        height: 187px;
        display: block;
    }
    .nes-container {
        padding: 0;
        margin: 0;
        width: 100%;
        background-color: #282e39;
    }
</style>

<div class="nes-container is-rounded">
    <iframe src={`https://store.steampowered.com/widget/${appid}`}></iframe>
</div>

