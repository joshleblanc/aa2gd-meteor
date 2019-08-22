<script>
    import StyledPaper from './StyledPaper';
    import Avatar from './Avatar';
    import Caption from './Caption';

    export let imgUrl;
    export let title;
    export let subtitle = undefined;
</script>

<style>
    .nameContainer {
        display: flex;
    }

    .grow {
        flex-grow: 1;
    }

    .title-container {
        flex-direction: column;
        margin: 8px
    }
</style>

<StyledPaper>
    <div class="columns">
        <div class="column nameContainer">
            <Avatar src={imgUrl} />
            <div class="title-container">
                <h4>{title}</h4>
                {#if subtitle}
                    <Caption>{subtitle}</Caption>
                {/if}
            </div>
        </div>
    </div>
    <div class="columns">
        <div class="column">
            <slot></slot>
        </div>
    </div>
</StyledPaper>