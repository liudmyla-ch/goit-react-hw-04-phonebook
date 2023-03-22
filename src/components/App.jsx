import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contact-form/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contact-list/ContactList';
import {
  getItemLocalStorage,
  setItemLocalStorage,
} from './local-storage-functions/LocalStorageFunc';

const App = () => {
  const [contacts, setContacts] = useState(() => getItemLocalStorage());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setItemLocalStorage(contacts);
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

  const filterContacts = () => {
    const filterToLoverCase = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLoverCase)
    );
    return filteredContacts;
  };

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
            filteredContacts={filterContacts}
            onDeleteContact={onDeleteContact}
          />
        </>
      )}
    </>
  );
};

export default App;
