<script>
  import DesktopDrawer from './DesktopDrawer';
  import MobileDrawer from './MobileDrawer';
  import { fly } from 'svelte/transition';

  export let mobileOpen = false

  let width;
</script>

<style>
  nav {
    width: 240px;
    flex-shrink: 0;
  }

  .mobile {
    z-index: 1500;
    position: relative;
  }
</style>

<svelte:window bind:innerWidth={width} />

{#if width > 600}
  <nav class="desktop">
    <div class="desktop">
      <DesktopDrawer />
    </div>
  </nav>
{:else}
  {#if mobileOpen}
    <nav class="mobile" transition:fly={{x: -250, y: 0, duration: 100}}>
      <div>
        <DesktopDrawer />
      </div>
    </nav>
  {/if}
{/if}
