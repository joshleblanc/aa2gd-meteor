<script>
  import classnames from 'classnames';
  export let title = false;
  export let className = "";

  const classNames = classnames({
    "nes-container": true,
    "with-title": !!title,
    "is-rounded": true,
    [className]: !!className
  });
</script>

<style>
  div.nes-container {
    padding: 12px;
    margin: 16px;
  }

  p {
    display: table;
    padding: 0 0.5rem;
    background-color: #303030;
  }
</style>

<div class={classNames}>
  {#if title}
    <p class="title">{title}</p>
  {/if}
  <slot></slot>
</div>