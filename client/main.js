import App from './App.svelte';
import 'nes.css/css/nes.css';

Meteor.startup(() => {
  console.log(document.querySelector('main'));
  new App({
    target: document.querySelector('main')
  });
});