<style>
  .root {
    flex: 0 0 auto;
  }

  .root > div {
    width: 240px;
    border-right: 1px solid black;
  }
</style>
<div class="root">
  <div>
    <slot></slot>
  </div>
</div>