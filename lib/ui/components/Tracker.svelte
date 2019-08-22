<script>
  import { Tracker } from 'meteor/tracker';
  import { Meteor } from 'meteor/meteor';
  import { onDestroy } from 'svelte';

  export let deps = [];
  export let fn;


  if(Meteor.isClient) {
    const dep = new Tracker.Dependency;

    $: {
      deps;
      dep.changed();
    }
    const computation = Tracker.autorun(() => {
      dep.depend();
      fn();
    });

    onDestroy(() => {
      computation.stop();
    });
  } else {
    console.log("Runnign function");
    fn();
  }


</script>

<slot></slot>
