const yargs = require("yargs");
const { saveContact, listContact, detailContact, deleteContact } = require("./contacts");

// Menambah data contact baru
yargs.command({
    command: "add",
    describe: "Add new contact",
    builder: {
        name: {
            describe: "Full Name",
            demandOption: true,
            type: "string",
        },
        phone: {
            describe: "Phone Number",
            demandOption: true,
            type: "string"
        },
        email: {
            describe: "Email Address",
            demandOption: false,
            type: "string",
        },
    },
    handler(argv) {
        saveContact(argv.name, argv.email, argv.phone)
    },
}).demandCommand();

// Menampilkan seluruh daftar contact
yargs.command({
    command: "list",
    describe: "Show all contact list",
    handler() {
        listContact()
    },
});

// Menampilkan detail contact berdasarkan nama
yargs.command({
    command: "detail",
    describe: "Show detail contact by name",
    builder: {
        name: {
            describe: "Full Name",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        detailContact(argv.name)
    },
});

// Menghapus contact berdasarkan nama
yargs.command({
    command: "delete",
    describe: "Delete contact by name",
    builder: {
        name: {
            describe: "Full Name",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        deleteContact(argv.name)
    },
});

yargs.parse();