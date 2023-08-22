import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    if (isContactNameUnique(name)) {
      const newContact = { id: generateUniqueId(), name, number };
      setContacts(prevContacts => [...prevContacts, newContact]);
    } else {
      alert(`Contact "${name}" already exists!`);
    }
  };

  const generateUniqueId = () => {
    return Date.now().toString();
  };

  const isContactNameUnique = name => {
    return !contacts.some(contact => contact.name === name);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ color: '#2874A6' }}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />

      <h2 style={{ color: '#2874A6' }}>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}

export default App;
