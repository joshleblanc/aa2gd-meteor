<script>
  import classnames from 'classnames';

  export let variant = "";
  export let className = "";
  export let disabled = false;
  export let value = "";

  let classNames = "";
  $: classNames = classnames({
    [`is-${variant}`]: !!variant,
    'is-diabled': disabled,
  }, className, 'nes-btn');

</script>

<style>
  button {
    font-size: 0.625rem;
  }
</style>

<button 
  class={classNames} 
  disabled={disabled} 
  on:click
>
  <slot></slot>
</button>