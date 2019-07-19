<script>
  import Dialog from './Dialog';
  import Caption from './Caption';
  import TextField from './TextField';
  import StyledPaper from './StyledPaper';
  import Button from './Button';
  import Loader from './Loader';
  import { webhooksReady } from '../stores/subscriptionStores';
  import { Tracker } from 'meteor/tracker';
  import { User } from '/lib/User';
  import { onDestroy } from 'svelte';
  import { Webhook } from '/lib/Webhook';
  import List from './List';
  import ListItem from './ListItem';
  import ListItemText from './ListItemText';
  import ListItemPrimaryText from './ListItemPrimaryText';
  import ListItemSecondaryText from './ListItemSecondaryText';
  
  export let serverId;

  let webhooks;
  let formValid = false;
  let errors = {};
  let webhook = new Webhook();
  webhook.serverId = serverId;
  const computation = Tracker.autorun(() => {
    webhooks = Webhook.find({
      serverId,
      creatorId: Meteor.userId()
    }).fetch();
    webhook.creatorId = Meteor.userId();
  });

  onDestroy(() => computation.stop());

  function setErrors(error) {
    formValid = false;
    errors = {};
    error.details.forEach(e => {
        errors[e.name] = e.message;
    });
  }

  function setValid(valid) {
    if(valid) {
        errors = {};
    }
    formValid = valid;
  }

  $: webhook.validate({ stopOnFirstError: false }, err => {
    if(err) {
        setErrors(err)
    } else {
        setValid(true);
    }
  });


  function handleSubmit() {
    webhook.insert();
  }

  export let open;
</script>

<Dialog open={open} on:close title="Webhooks">
  <h5>Register Wehooks</h5>
  <Caption>You can register webhooks here to get notifications of events in your server.</Caption>
  <TextField label="Name" fullWidth on:input={e => webhook.name = e.target.value} helperText={errors.name} />
  <TextField label="URL" fullWidth on:input={e => webhook.url = e.target.value} helperText={errors.url} />
  <Button variant="primary" on:click={handleSubmit} disabled={!formValid}>Submit</Button>
  <StyledPaper title="Registered Webhooks">
    {#if $webhooksReady}
      <List>
        {#each webhooks as webhook}
          <ListItem>
            <ListItemText>
              <ListItemPrimaryText>{webhook.name}</ListItemPrimaryText>
              <ListItemSecondaryText>{webhook.url.split('/')[6]}</ListItemSecondaryText>
            </ListItemText>
            <Button variant="error" on:click={() => window.confirm("Are you sure?") && webhook.delete()}>Delete</Button>
          </ListItem>
        {/each}
      </List>
    {:else}
      <Loader />
    {/if}
  </StyledPaper>
</Dialog>