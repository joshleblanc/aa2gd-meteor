<script>
    import AutocompleteAdornment from './AutocompleteAdornment';
    import AutocompleteDialog from './AutocompleteDialog';
    import TextField from '../TextField';
    import { createEventDispatcher } from 'svelte';

    export let label = null;
    export let selectedItem = {};
    export let fullWidth = false;
    export let error = null;
    export let helperText = null;
    export let placeholder = "";
    export let options = [];
    export let name = "";

    const dispatch = createEventDispatcher();

    let modalOpen = false;
</script>

<TextField 
    label={label}
    value={selectedItem.name}
    on:click={() => modalOpen = true}
    fullWidth={fullWidth}
    error={error}
    helperText={helperText}
    disabled
    adornment={AutocompleteAdornment}
/>
<AutocompleteDialog
    open={modalOpen}
    label={label}
    on:close={() => modalOpen = false}
    on:select={item => {
        selectedItem = options.find(o => o.value === item.detail);
        dispatch('change', selectedItem.value);
    }}
    title={placeholder}
    options={options}
    name={name}
/>
