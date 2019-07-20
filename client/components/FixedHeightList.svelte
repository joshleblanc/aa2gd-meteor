<script>
  import List from './List';
  export let height;

</script>

<style>
  .fixed-height-list {
    overflow-y: auto;
    height: 560px;
  }
</style>

<div class="fixed-height-list">
  <List dense>
    <slot></slot>
  </List>
</div>


