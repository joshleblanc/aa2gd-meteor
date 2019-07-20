<script>
  import classnames from 'classnames';
  import Loader from './Loader';
  import { fade } from 'svelte/transition';

  export let variant = "";
  export let className = "";
  export let disabled = false;
  export let value = "";
  export let loading = false;
  
  let classNames = "";
  $: classNames = classnames({
    [`is-${variant}`]: !!variant,
    'is-disabled': disabled,
  }, className, 'nes-btn');

</script>

<style>
  button {
    font-size: 0.625rem;
    margin: 8px;
    max-height: 35px;
  }
</style>


{#if loading}
  <Loader />
{:else}
  <button 
    class={classNames} 
    disabled={disabled} 
    on:click
  >
  <slot></slot>
</button>
{/if}
