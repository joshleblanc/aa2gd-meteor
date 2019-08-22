<script>
    import TextField from './TextField';
    import { format } from '/lib/constants';
    import Picker from 'pickerjs';
    import { createEventDispatcher } from 'svelte';
    import moment from 'moment';

    export let value;
    export let helperText;

    $: valueString = moment(value).format(format);

    const date = new Date();
    date.setSeconds(0);
    date.setMinutes(0);

    const dispatch = createEventDispatcher();
    let ref;
    $: {
        if(ref) {
            const picker = new Picker(ref, {
                format: format,
                headers: true,
                date: date,
                pick: () => {
                    dispatch('change', picker.getDate());
                },
                controls: true,
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

<TextField label="Date and time" fullWidth bind:ref={ref} value={valueString} helperText={helperText}/>