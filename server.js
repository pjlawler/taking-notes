let { notes } = require('./db/db.json');

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3001

// API routes

app.get('/api/notes', (req, res) => {

    // Get all notes

    // Responds with the current array of notes
    res.json(notes);
});
app.post('/api/notes', (req, res) => {

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
app.delete('/api/notes/:id', (req, res) => {
    
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


// HTML routes

app.get('/notes', (req, res) => {
    // Directs the /notes to then notes.html
    res.sendFile(path.join(__dirname, './public/notes.html'))
})
app.get('/', (req, res) => {
    // Directs the main url to the landing page
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get('*', (req, res) => {
    // Wildcard allows all other redirects to the landing page
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


  // Misc functions
  function saveNoteFile(notes) {
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notes }, null, 2)
    );
  }


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})
