const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = `./data`;
const filePath = `${dirPath}/contacts.json`;

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
}

const loadContact = () => {
    const file = fs.readFileSync(filePath, "utf-8");
    const contacts = JSON.parse(file);
    return contacts;
}

const saveContact = (name, email, phone) => {
    const contact = { name, email, phone };
    const contacts = loadContact();
    if (!validator.isEmpty(name)) {
        if (validator.isLength(name, { min: 3 })) {
            const duplicate = contacts.find((contact) => contact.name === name);
            if (duplicate) {
                console.info(chalk.inverse.bold.yellow(`Contact with name "${name}" already exists, please try another name!`));
                return false;
            }
        } else {
            console.info(chalk.inverse.bold.yellow("Name must be more than 3 characters, please try again!"));
            return false;
        }
    } else {
        console.info(chalk.inverse.bold.yellow("Contact name is required."));
        return false;
    }

    if (!validator.isEmpty(phone)) {
        if (!validator.isMobilePhone(phone, 'id-ID')) {
            console.info(chalk.inverse.bold.yellow("Invalid phone number, please try again!"));
            return false;
        }
    } else {
        console.info(chalk.inverse.bold.yellow("Phone number is required."));
        return false;
    }

    if (email) {
        if (!validator.isEmail(email)) {
            console.info(chalk.inverse.bold.yellow("Invalid email address, please try again!"));
            return false;
        }
    }

    contacts.push(contact);

    fs.writeFileSync(filePath, JSON.stringify(contacts));
    console.info(chalk.inverse.bold.green("Contact saved successfully."));
}

const listContact = () => {
    const contacts = loadContact();
    if (contacts.length < 1) {
        console.info(chalk.inverse.bold.yellow("No contact available, add first!"));
        return false;

    } else {
        console.info(chalk.inverse.bold.blue("Contact List"));

        let email;

        contacts.forEach((contact, i) => {
            if (contact.email) {
                email = contact.email;
            } else {
                email = "*";
            }
            console.info(`${i + 1}. ${contact.name} - ${contact.phone} - ${email}`);
        });
    }
}

const detailContact = (name) => {
    if (!validator.isEmpty(name)) {
        const contacts = loadContact();
        const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
        if (!contact) {
            console.info(chalk.inverse.bold.yellow(`Contact with name "${name}" not found.`));
            return false;
        }

        let email;

        if (contact.email) {
            email = contact.email;
        } else {
            email = "*";
        }

        console.info(chalk.inverse.bold.blue("Contact List"));
        console.info(`1. ${contact.name} - ${contact.phone} - ${email}`);

    } else {
        console.info(chalk.inverse.bold.yellow("Contact name is required."));
        return false;
    }
}

const deleteContact = (name) => {
    if (!validator.isEmpty(name)) {
        const contacts = loadContact();
        const newContacts = contacts.filter((contact) => contact.name.toLowerCase() !== name.toLowerCase());
        if (contacts.length === newContacts.length) {
            console.info(chalk.inverse.bold.yellow(`Contact with name "${name}" not found.`));
            return false;
        }

        fs.writeFileSync(filePath, JSON.stringify(newContacts));
        console.info(chalk.inverse.bold.green(`Contact with name "${name}" has been deleted.`));

    } else {
        console.info(chalk.inverse.bold.yellow("Contact name is required."));
        return false;
    }
}

module.exports = { saveContact, listContact, detailContact, deleteContact };