<script>
    import StyledPaper from './StyledPaper';
    import Avatar from './Avatar';

    export let imgUrl;
    export let title;
</script>

<style>
    h4 {
        margin: 8px
    }
    .nameContainer {
        display: flex;
    }

    .grow {
        flex-grow: 1;
    }
</style>

<StyledPaper>
    <div class="columns">
        <div class="column is-three-quarters-desktop nameContainer">
            <Avatar src={imgUrl} />
            <h4>{title}</h4>
        </div>
        <div class="column is-1-quarter-desktop nameContainer">
            <div class="grow" />
            <slot></slot>
        </div>
    </div>
</StyledPaper>