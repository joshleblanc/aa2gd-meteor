import App from './App.svelte';
import 'bulma/css/bulma.css';
import 'nes.css/css/nes.css';
import '@fortawesome/fontawesome-pro/css/all.css';
import '@fortawesome/fontawesome-pro/js/all.js';
import 'pickerjs/dist/picker.css';
import { Tracker } from 'meteor/tracker';
import { User } from '../lib/User';

Meteor.startup(() => {
  new App({
    target: document.querySelector('main')
  });
});