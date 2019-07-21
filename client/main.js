import App from './App.svelte';
import 'bulma/css/bulma.css';
import 'nes.css/css/nes.css';
import '@fortawesome/fontawesome-pro/css/all.css';
import '@fortawesome/fontawesome-pro/js/all.js';
import 'pickerjs/dist/picker.css';

Meteor.startup(() => {
  new App({
    target: document.querySelector('main')
  });
});