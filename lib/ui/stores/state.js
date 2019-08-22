import { writable } from 'svelte/store';

export const populatingUserData = writable(false);
export const loggingIn = writable(false);