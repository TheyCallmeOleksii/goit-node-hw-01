const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

console.log("Hello world");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);

      break;

    case "get":
      const user = await getContactById(id);
      console.log(user);
      break;

    case "remove":
      const userDelete = await removeContact(id);
      console.log(userDelete);
      break;

    case "add":
      const newObj = await addContact(name, email, phone);
      console.log(newObj);
      break;

    default:
      console.warn("\x1B[31m Unknown action type123!");
  }
}

invokeAction(argv);
