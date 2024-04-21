import Contacts from "./contact.js";
import { program } from "commander";

async function invokeAction({ action, index, name, number, email }) {
  switch (action) {
    case "list":
      const listContacts = await Contacts.listContacts();
      return listContacts;
    case "get":
      const getContactById = await Contacts.getContactById(index);
      return getContactById;
    case "add":
      const addContact = await Contacts.addContact(name, number, email);
      return addContact;
    case "remove":
      const removeContact = await Contacts.removeContact(index);
      return removeContact;
    default:
      return "unknown action";
  }
}

program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --index <index>", "Contact index")
  .option("-n, --name <name>", "Contact name")
  .option("-e, --email <email>", "Contact email")
  .option("-p, --phone <phone>", "Contact phone number");

program.parse(process.argv);

invokeAction(program.opts()).then(console.log).catch(console.error);
