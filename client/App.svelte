<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from './pages/Home.svelte';

  export let url = "";
</script>


<Router url="{url}">
  <nav>
    <Link to="/home">Home</Link>
  </nav>
  <div>
    <Route path="home" component="{Home}" />
  </div>
</Router>

