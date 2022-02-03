const chalk = require('chalk');
const yargs = require('yargs');
const notesUtil = require('./notesUtil.js');


// Customize Yargs version
yargs.version('1.1.0');

// Add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title to be added',
            demandOption: true, // makes title a required field
            type: 'string'  // force type to string
        },
        body: {
            describe: 'Note body to be added',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.addNote(argv.title, argv.body);
    }
});

// List
yargs.command({
    command: 'list',
    describe: 'Output a list of existing notes',
    handler() {
        notesUtil.listNotes();
    }
});

// Read
yargs.command({
    command: 'read',
    describe: 'Print out a specific note',
    builder: {
        title:{
            describe: 'Note title to be read out',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.readNote(argv.title);
    }
});

// Remove
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.removeNote(argv.title);
    }
});

yargs.parse();  // Parses the arguments without having to console.log