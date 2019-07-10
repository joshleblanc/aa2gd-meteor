<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from './pages/Home.svelte';
  import Navbar from './components/Navbar';

  export let url = "";
</script>

<style>
  .root {
    display: flex;
  }
  
  .toolbar {
    min-height: 64px;
  }
</style>

<div class="root">
  <Router url="{url}">
    <Navbar />
    <div>
      <div class="toolbar" />
      <Route path="home" component="{Home}" />
    </div>
  </Router>
</div>


