import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { Routes, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    alert("Do you really want to remove this contact");
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ContactList
              contacts={contacts}
              getContactId={removeContactHandler}
            />
          }
        />
        <Route
          path="/add"
          element={<AddContact addContactHandler={addContactHandler} />}
        />

        <Route path="/contact/:id" element={<ContactDetail />} />
      </Routes>
    </div>
  );
}

export default App;

{
  /**
 <Route
          path="/"
          render={(props) => {
            <ContactList
              {...props}
              contacts={contacts}
              getContactId={removeContactHandler}
            />;
          }}
        />
        <Route
          path="/add"
          render={(props) => {
            <AddContact {...props} addContactHandler={addContactHandler} />;
          }}
        />
 */
}
