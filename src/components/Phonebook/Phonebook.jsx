import React, { Component } from "react";
import PhonebookAdd from "./PhonebookAdd";
import Contactlist from "./Contactlist";
import { nanoid } from "nanoid";

export default class Phonebook extends Component {
    state = {
        contacts: [],
        filter: '',
      }

addContact = (contact) => {
    if (this.isDublicate(contact)){
        return alert(`${contact.name} - ${contact.number} is already on the site`)
    }
    this.setState((prev) => {
        const newContact = {
            id: nanoid(),
            ...contact
        }
        return {
            contacts: [...prev.contacts, newContact]
        }
    })
}

removeContact = (id) => {
    this.setState((prev) => {
        const newContacts = prev.contacts.filter((item) => item.id !== id);
        return {
            contacts: newContacts
        }
    })
}

handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
        [name]: value
    })
}

isDublicate({name, number}) {
    const { contacts } = this.state;
    const result = contacts.find((item) => item.name === name && item.number === number);
    return result;
}

getFilteredContacts() {
    const { contacts, filter } = this.state;
    if(!filter) {
        return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
        const normalizedName = name.toLocaleLowerCase();
        const normalizedNumber = number.toLocaleLowerCase();
        const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
        return result;
    })

    return filteredContacts;
}

    render() {
        const { addContact, removeContact, handleChange } = this;
        const { filter } = this.state;
        const contacts = this.getFilteredContacts();
        return (
            <>
            <div>
                <PhonebookAdd onSubmit={addContact}/>
            </div>
            <div>
                <input type="text" name="filter" onChange={handleChange} value={filter}/>
                <Contactlist items={contacts} removeContact={removeContact}/>
            </div>
            
            </>
        )
    }
}