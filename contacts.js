// const nanoid = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

async function readFile() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error.message);
    return [];
  }
}

async function listContacts() {
  const json = await readFile();
  return json;
}

async function getListContacts() {
  const json = await readFile();
  return json;
}

async function getContactById(contactId) {
  const contacts = await getListContacts();
  const user = contacts.find((contact) => contact.id === contactId) || null;
  return user;
}

async function removeContact(contactId) {
  const contacts = await getListContacts();
  const elbyId = contacts.find((contact) => contact.id === contactId) || null;
  if (elbyId === null) {
    return null;
  }

  const newarrcontact = contacts.filter((contact) => contact.id !== elbyId.id);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(newarrcontact, null, 2));
    return elbyId;
  } catch (error) {
    console.error("Error writing  file:", error.message);
    return null;
  }
}

async function addContact(name, email, phone) {
  const newObj = {
    // id: nanoid.nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  const contacts = await getListContacts();
  const updatedContacts = [...contacts, newObj];

  try {
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return newObj;
  } catch (error) {
    console.error("Error writing  file:", error.message);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
