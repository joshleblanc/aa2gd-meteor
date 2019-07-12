<script>
  import { Router, Link, Route } from "svelte-routing";
  import Sidebar from './components/Sidebar';
  import Home from './pages/Home.svelte';
  import Navbar from './components/Navbar';
  import Profile from './pages/Profile.svelte';

  export let url = "";
</script>

<style>
  .root {
    display: flex;
    font-family: "Press Start 2P";
  }
  
  .toolbar {
    min-height: 64px;
  }

  .content {
    height: 100%;
    width: 100%;
  }
</style>

<div class="root">
  <Router url="{url}">
    <Navbar />
    <Sidebar />
    <div class="content">
      <div class="toolbar" />
      <Route path="home" component="{Home}" />
      <Route path="profile" component="{Profile}" />
    </div>
  </Router>
</div>


