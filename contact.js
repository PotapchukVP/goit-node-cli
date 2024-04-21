import fs from "fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.resolve("contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (typeof contact === "undefined") return null;

  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const deleteContact = contacts.find((contact) => contact.id === contactId);
  if (deleteContact === undefined) return null;

  contacts.splice(contacts.indexOf(deleteContact), 1);
  await writeContacts(contacts);

  return deleteContact;
}

async function addContact(name, number, email) {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name: name,
    number: number,
    email: email,
  };

  contacts.push(newContact);
  await writeContacts(contacts);

  return newContact;
}

function writeContacts(contacts) {
  return fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, undefined, 2),
    "utf8"
  );
}

export default { listContacts, getContactById, addContact, removeContact };
