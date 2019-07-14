<script>
  import { Router, Link, Route } from "svelte-routing";
  import Sidebar from './components/Sidebar';
  import Home from './pages/Home.svelte';
  import Navbar from './components/Navbar';
  import Profile from './pages/Profile.svelte';
  import EventForm from './pages/EventForm.svelte';


  export let url = "";
</script>

<style>
  .root {
    display: flex;
  }
  
  .toolbar {
    min-height: 64px;
  }

  .content {
    height: 100%;
    width: 100%;
  }
</style>

<svelte:head>
  <!-- Overriding some bulma styles -->
	<style>
    .title {
      font-weight: 100 !important;
      color: black !important;
    }

    body {
      color: rgba(0, 0, 0, 0.87);
      margin: 0;
      font-size: 0.625rem;
      font-family: "Press Start 2P",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
      font-weight: 400;
      line-height: 1.43;
    }

    button {
      font-family: "Press Start 2P",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    }

    .datepicker {
      width: 100%;
    }

    .picker-cancel, .picker-confirm {
      display: inline-block !important
    }
  </style>>
</svelte:head>


<div class="root">
  <Router url="{url}">
    <Navbar />
    <Sidebar />
    <div class="content">
      <div class="toolbar" />
      <Route path="home" component="{Home}" />
      <Route path="profile" component="{Profile}" />
      <Route path="events/new" component={EventForm} />
    </div>
  </Router>
</div>


