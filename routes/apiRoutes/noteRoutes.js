const router = require('express').Router();
const { saveNoteFile } = require('../../lib/notes');
let { notes } = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {

    // Get all notes

    // Responds with the current array of notes
    res.json(notes);
});
router.post('/notes', (req, res) => {

    // Save a new note

    // Gets the note object to be saved from the post's body
    let note = req.body;
    
    // Adds a unique id to the note object
    note.id = uuidv4();

    // Adds the new note to the array
    notes.push(note)
    
    // Saves the notes db file
    saveNoteFile(notes);

    res.json(note);
});
router.delete('/notes/:id', (req, res) => {
    
    // Delete a single note by id
    
    const deleteId = req.params.id;
    let noteDeleted = false;
    
    // Updates the notes array in place  with all records except the one that matches the ID
    notes = notes.filter(note => { 
        if(note.id == deleteId) {
            // Sets the noteDeleted flag if the file is found 
            noteDeleted = true; 
        } else { 
            // Returns the unmatched object back to the array
            return true; 
        }
    });

    if(noteDeleted) {
        // If a note was removed, then saves the current notes array to a json file and responds with an "ok" status
        saveNoteFile(notes);
        res.sendStatus(200)
    } else { 
        // If no matching note was found then it will respond with a "not found" status
        res.sendStatus(404)
    }
});

module.exports = router;