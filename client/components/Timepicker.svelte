<script>
    import TextField from './TextField';
    import { format } from '../constants';
    import Flatpickr from 'svelte-flatpickr/src/Flatpickr.svelte';
    import 'flatpickr/dist/flatpickr.css';
    import 'flatpickr/dist/themes/light.css';
    import { createEventDispatcher } from 'svelte';
    import moment from 'moment';

    export let value;
    export let helperText;

    $: valueString = moment(value).format(format);

    const date = new Date();
    date.setSeconds(0);
    date.setMinutes(0);

    let picker;

    const dispatch = createEventDispatcher();
    let ref;
    const options = {
        enableTime: true,
        onChange: (selectedDates, dateStr, instance) => {
            console.log('Options onChange handler')
        }
    };

    $: {
        if(ref) {
            console.log(ref);

            picker = flatpickr(ref, {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                element: "#flatpickr"
            });
            console.log(picker);
            // const picker = new Picker(ref, {
            //     format: format,
            //     headers: true,
            //     date: date,
            //     pick: () => {
            //         dispatch('change', picker.getDate());
            //     },
            //     controls: true,
            //     increment: {
            //         year: 1,
            //         month: 1,
            //         day: 1,
            //         hour: 1,
            //         minute: 15,
            //     }
            // });
        }

    }
</script>

<Flatpickr options="{options}" element="#flatpickr">
    <div class="flatpickr" id="flatpickr">
        <TextField/>

    </div>
</Flatpickr>

<!--<TextField-->
<!--        label="Date and time"-->
<!--        fullWidth bind:ref={ref}-->
<!--        value={valueString}-->
<!--        helperText={helperText}-->
<!--        on:click={() => {-->
<!--            console.log("wefin");-->
<!--            picker.open() }}-->
<!--/>-->
