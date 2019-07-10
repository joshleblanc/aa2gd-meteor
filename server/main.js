import { Meteor } from 'meteor/meteor';
import Persons from '/lib/Persons';

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    { service: 'discord' },
    {
      $set: {
        loginStyle: "redirect",
        clientId: "570931295253823488", 
        secret: "C6RXU2uDnb1Um1yxRxlnTXBdYsAiTCE8"
      }
    }
  );


  if(Persons.find().count() < 1) {
    Persons.insert({
      name: "Meteor developer"
    });
  }
});
