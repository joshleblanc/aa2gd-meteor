<script>
  import { Router, Link, Route } from "svelte-routing";
  import Sidebar from './components/Sidebar';
  import Home from './pages/Home.svelte';
  import Navbar from './components/Navbar';
  import Profile from './pages/Profile.svelte';
  import EventForm from './pages/EventForm.svelte';
  import { currentUserReady } from './stores/subscriptionStores';
  import Server from './pages/Server';
  import { Meteor } from 'meteor/meteor';
  import { User } from '/lib/User';
  import Event from './pages/Event';
  import { Tracker } from 'meteor/tracker';

  export let url = "";
  let mobileOpen = false;
  let user;
  Tracker.autorun(() => {
    user = User.current();
  });
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
    min-width: 100%;
    font-weight: unset !important;
  }

  @media (min-width: 601px) {
    .content {
      min-width: 0;
    }
  }
</style>

<svelte:head>
  <!-- Overriding some bulma styles -->
	<style>
    .datepicker {
      width: 100%;
    }

    .picker-cancel, .picker-confirm {
      display: inline-block !important
    }

    a {
      color: black;
    }

    a:visited {
      color: black;
    }

    a:hover {
      text-decoration: none;
    }

    .content h6 {
      font-weight: unset;
    }

    .title {
      font-weight: unset;
    }

    .content h4 {
      font-weight: unset;
    }

    body {
      font-size: 0.85rem;
    }
  </style>
</svelte:head>

{#if $currentUserReady}
  {#if user}
    <div class="root">
      <Router url="{url}">
        <Navbar on:mobileOpen={() => { mobileOpen = !mobileOpen } } mobileOpen={mobileOpen} />
        <Sidebar mobileOpen={mobileOpen} />
        <div class="content">
          <div class="toolbar" />
          <Route path="home" component="{Home}" />
          <Route path="profile" component="{Profile}" />
          <Route path="events/new" component={EventForm} />
          <Route path="events/:id" component={Event} />
          <Route path="servers/:id" component={Server} />
        </div>
      </Router>
    </div>
  {:else}
    <div class="root">
      <Navbar mobileOpen={false} />
      <div class="content">
        <div class="toolbar" />
        <Home />
      </div>
    </div>
  {/if}
{/if}




