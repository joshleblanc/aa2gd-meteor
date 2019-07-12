import App from './App.svelte';
import 'nes.css/css/nes.css';
import 'bulma/css/bulma.css';

Meteor.startup(() => {
  Meteor.subscribe('currentUser');

  new App({
    target: document.querySelector('main')
  });
});