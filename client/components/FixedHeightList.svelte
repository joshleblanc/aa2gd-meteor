<script>
  import List from './List';
  export let height;

</script>

<style>
  .fixed-height-list {
    overflow-y: auto;
  }
</style>

<div class="fixed-height-list" style="height: {height}px">
  <List dense>
    <slot></slot>
  </List>
</div>


