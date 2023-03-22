import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contact-form/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contact-list/ContactList';

const LOCALSTORAGE_KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitForm = values => {
    const { name } = values;
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts!`);
    } else {
      const newContact = { id: nanoid(), ...values };
      setContacts(prevState => [...prevState, newContact]);
    }
  };

  const onChangeFilter = evt => {
    const filterValue = evt.target.value;
    setFilter(filterValue);
  };

  const onDeleteContact = id => {
    const updatedContacts = contacts?.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };
  console.log(contacts.length);
  const filterToLoverCase = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterToLoverCase)
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={onSubmitForm} />
      {contacts.length === 0 ? (
        <></>
      ) : (
        <>
          <h2>Contacts</h2>
          <Filter onChangeFilter={onChangeFilter} />
          <ContactList
            filteredContacts={filteredContacts}
            onDeleteContact={onDeleteContact}
          />
        </>
      )}
    </>
  );
};

export default App;
