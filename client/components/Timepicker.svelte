<script>
    import TextField from './TextField';
    import Picker from 'pickerjs';
    import { createEventDispatcher } from 'svelte';
    import moment from 'moment';

    export let value;
    export let helperText;
    const dispatch = createEventDispatcher();
    let ref;
    $: {
        if(ref) {
            const picker = new Picker(ref, {
                format: 'YYYY-MM-DD HH:mm',
                headers: true,
                pick: () => {
                    dispatch('change', moment(picker.getDate()));
                },
                increment: {
                    year: 1,
                    month: 1,
                    day: 1,
                    hour: 1,
                    minute: 15,
                }
            });
        }
        
    }
</script>

<TextField label="Date and time" fullWidth bind:ref={ref} value={value} helperText={helperText}/>