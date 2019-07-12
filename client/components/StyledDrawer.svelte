<style>
  .root {
    flex: 0 0 auto;
  }

  .root > div {
    width: 240px;
    border-right: 1px solid black;
    top: 0;
    flex: 1 0 auto;
    height: 100%;
    display: flex;
    z-index: 1200;
    outline: none;
    position: fixed;
    overflow-y: auto;
    flex-direction: column;
  }
</style>
<div class="root">
  <div>
    <slot></slot>
  </div>
</div>