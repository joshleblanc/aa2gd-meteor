<script>
  import { Tracker } from 'meteor/tracker';
  import { Meteor } from 'meteor/meteor';
  import { onDestroy } from 'svelte';

  export let deps = [];
  export let fn;
  const dep = new Tracker.Dependency;

  $: {
    $$props
    dep.changed();
  }

  const computation = Tracker.autorun(() => {
    dep.depend();
    fn();
  });

  onDestroy(() => {
    computation.stop();
  })
</script>

<slot></slot>
