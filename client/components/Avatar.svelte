<script>
    export let src;
    export let alt;
</script>

<style>
    div {
        width: 40px;
        height: 40px;
        display: flex;
        position: relative;
        overflow: hidden;
        font-size: 0.8928571428571429rem;
        align-items: center;
        flex-shrink: 0;
        user-select: none;
        border-radius: 50%;
        justify-content: center;
    }

    img {
        width: 100%;
        height: 100%;
        text-align: center;
        object-fit: cover;
    }
</style>

<div>
    <img alt={alt} src={src}>
</div>