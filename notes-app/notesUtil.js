const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes();

    // Return the note with a matching title
    const duplicateNote = findNoteByTitle(notes, title);
    
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);

        console.log(chalk.green('New note added successfully!'));
    } else {
        console.log(chalk.red.inverse('A note with that title already exists!'));
    }

};

const findNoteByTitle = (notesArr, title) => {
    return notesArr.find((note) => note.title === title)
};

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.bold.blue('Your Notes:'));
    notes.forEach((note) => {
        console.log(note.title);
    });
};

const loadNotes = () => {
    // Look for the file, if it doesn't exist return a blank object
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];  // Blank array sets us up to create our new file
    }
};

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = findNoteByTitle(notes, title);

    if (foundNote) {
        console.log(chalk.bold.yellow(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();

    // Return notes that do not match the title given to us by the user
    const notesToKeep = notes.filter((note) => note.title !== title);

    // Check if we removed a note
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green('Note removed successfully!'));

        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

module.exports = {
    addNote: addNote,
    listNotes: listNotes,
    readNote: readNote,
    removeNote: removeNote
};