<script>
  import classnames from 'classnames';

  export let variant;
  export let className;
  export let disabled;
  export let value;

  const classNames = classnames({
    [`is-${variant}`]: !!variant,
    'is-disabled': disabled
  }, className, 'nes-btn');

</script>

<style>
  button {
    font-size: 0.625rem;
  }
</style>

<button class={classNames} disabled={disabled} on:click><slot></slot></button>