<script>
  import AutocompleteAdornment from "./AutocompleteAdornment";
  import AutocompleteDialog from "./AutocompleteDialog";
  import TextField from "../TextField";
  import { createEventDispatcher } from "svelte";

  export let label = null;
  export let multiple = false;
  export let fullWidth = false;
  export let error = null;
  export let helperText = null;
  export let placeholder = "";
  export let options = [];
  export let name = "";
  export let loading = false;

  export let selected;

  if (!selected) {
    if (multiple) {
      selected = [];
    } else {
      selected = "";
    }
  }

  const dispatch = createEventDispatcher();

  let textFieldValue = "";
  $: {
    if (multiple) {
      textFieldValue = selected.map(s => s.name).join(", ");
    } else if(selected) {
      textFieldValue = selected.name;
    }
  }

  let modalOpen = false;
</script>

<TextField 
    label={label}
    value={textFieldValue}
    on:click={() => modalOpen = true}
    fullWidth={fullWidth}
    error={error}
    helperText={loading ? "Loading..." : helperText}
    disabled
    loading="{loading}"
    adornment={AutocompleteAdornment}
/>
<AutocompleteDialog
    open={modalOpen}
    label={label}
    multiple={multiple}
    on:close={() => modalOpen = false}
    selected={selected}
    on:change={item => {
      const selectedItem = options.find(o => o.value === item.detail);
      if(multiple) {
        if(selected.find(s => s.value === item.detail)) {
          dispatch('change', selected.filter(s => s.value !== item.detail));
        } else {
          dispatch('change', [
            ...selected,
            selectedItem
          ]);
        }
      } else {
        dispatch('change', selectedItem)
      }
    }}
    title={placeholder}
    options={options}
    name={name}
/>
