<style>
    li {
        padding-left: 16px;
        padding-right: 16px;
        width: 100%;
        display: flex;
        position: relative;
        box-sizing: border-box;
        text-align: left;
        align-items: center;
        padding-top: 8px;
        padding-bottom: 8px;
        justify-content: flex-start;
        text-decoration: none;
    }

    li:hover {
        background-color: rgba(0,0,0,0.08);
    }
</style>

<li on:click>
    <slot></slot>
</li>