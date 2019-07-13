import App from './App.svelte';
import 'nes.css/css/nes.css';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-pro/css/all.css';
import '@fortawesome/fontawesome-pro/js/all.js';
import { Tracker } from 'meteor/tracker';

Meteor.startup(() => {
  const handle = Meteor.subscribe('currentUser');
  console.log("weuiofnwef");
  Tracker.autorun(() => {
    if(handle.ready()) {
      new App({
        target: document.querySelector('main')
      });
    }
  })
});