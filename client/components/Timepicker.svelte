<script>
    import TextField from './TextField';
    import Flatpickr from 'svelte-flatpickr/src/Flatpickr.svelte';
    import 'flatpickr/dist/flatpickr.css';
    import 'flatpickr/dist/themes/airbnb.css';
    import { createEventDispatcher } from 'svelte';

    export let value;
    export let helperText;

    const dispatch = createEventDispatcher();
    const options = {
        enableTime: true,
        minuteIncrement: 15,
        onChange: (selectedDates, dateStr, instance) => {
            dispatch('change', selectedDates[0]);
        }
    };

</script>

<Flatpickr options="{options}" element="#flatpickr" value={value}>
    <div class="flatpickr" id="flatpickr">
        <TextField fullWidth helperText="{helperText}"/>
    </div>
</Flatpickr>