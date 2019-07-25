import { onPageLoad } from 'meteor/server-render';
import App from '../app/App.svelte';
import 'bulma/css/bulma.css';
import 'nes.css/css/nes.css';
import '@fortawesome/fontawesome-pro/css/all.css';
import '@fortawesome/fontawesome-pro/js/all.js';
import 'pickerjs/dist/picker.css';

onPageLoad(() => {
  new App({
    target: document.querySelector('main'),
    hydrate: true
  });
});