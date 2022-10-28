import { default as React } from 'react';
import { Container } from './App.styled';
import { ContactForm } from '../ContactForm';
import { ContactList } from '../ContactList';
import { Filter } from '../Filter';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localStrContacts = localStorage.getItem('contacts');
    if (!localStrContacts) {
      return;
    }
    try {
      const localContacts = JSON.parse(localStrContacts);
      if (!(localContacts instanceof Array)) {
        this.toastAlert(
          'Error of reading localStorage contacts: array expected'
        );
        return;
      }
      this.setState({
        contacts: [...localContacts],
      });
    } catch (exc) {
      this.toastAlert(
        'Error of reading localStorage contacts: JSON data is invalid'
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.contacts !== this.state.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  emptyMsg = 'Contact list is empty';
  emptyFilterMsg = 'Nothing is found';

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  addContact = ({ name, number }) => {
    const found = this.state.contacts.findIndex(
      el => el.name.trim().toUpperCase() === name.trim().toUpperCase()
    );
    if (found >= 0) {
      this.toastAlert(`${name} already exists`);
      return false;
    }
    this.setState({
      contacts: [
        ...this.state.contacts,
        {
          id: nanoid(),
          name: name.trim(),
          number: number.trim(),
        },
      ],
    });
    return true;
  };

  handleDelete = evt => {
    const contactId = evt.currentTarget.parentNode.id;
    const newContacts = this.state.contacts.filter(el => el.id !== contactId);
    this.setState({
      contacts: newContacts,
      filter: newContacts.length > 0 ? this.state.filter : '',
    });
  };

  getContacts = () => {
    if (this.state.filter) {
      return this.state.contacts.filter(el =>
        el.name.toUpperCase().includes(this.state.filter.trim().toUpperCase())
      );
    }
    return this.state.contacts;
  };

  toastAlert = msg => {
    toast.error(msg);
  };

  render() {
    return (
      <Container>
        <Toaster position="top-right" />
        <h1>Phonebook</h1>
        <ContactForm
          addContact={this.addContact}
        />

        <h2>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <>
            <Filter
              filter={this.state.filter}
              handleFilter={this.handleChange}
            />
            {this.getContacts().length > 0 ? (
              <ContactList
                contacts={this.getContacts()}
                handleDelete={this.handleDelete}
              />
            ) : (
              <p>{this.emptyFilterMsg}</p>
            )}
          </>
        ) : (
          <p>{this.emptyMsg}</p>
        )}
      </Container>
    );
  }
}
