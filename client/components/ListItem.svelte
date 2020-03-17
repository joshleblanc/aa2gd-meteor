<script>
    export let noHover = false;
    export let selected = false;
</script>

<style>
    li {
        width: 100%;
        display: flex;
        position: relative;
        box-sizing: border-box;
        text-align: left;
        align-items: center;
        padding: 8px 16px;
        justify-content: flex-start;
        text-decoration: none;
    }

    li:hover.no-hover {
        background-color: unset;
    }

    li:hover {
        background-color: rgba(0,0,0,0.08);
    }

    /* stole this from nes.css */
    .selected {
      position: absolute;
      top: 18px;
      left: -2px;
      content: "";
      width: 2px;
      height: 2px;
      color: #212529;
      box-shadow: 2px 2px, 4px 2px, 2px 4px, 4px 4px, 6px 4px, 8px 4px, 2px 6px, 4px 6px, 6px 6px, 8px 6px, 10px 6px, 2px 8px, 4px 8px, 6px 8px, 8px 8px, 10px 8px, 12px 8px, 2px 10px, 4px 10px, 6px 10px, 8px 10px, 10px 10px, 2px 12px, 4px 12px, 6px 12px, 8px 12px, 2px 14px, 4px 14px;
    }
</style>

<li on:click class:no-hover={noHover}>
  <div class:selected></div>
  <slot></slot>
</li>
