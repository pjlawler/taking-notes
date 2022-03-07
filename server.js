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

// Delete a single note by id
app.delete('/api/notes/:id', (req, res) => {
    
    const deleteId = req.params.id;
    let noteDeleted = false;
    
    notes = notes.filter(note => { 
        if(note.id == deleteId) { noteDeleted = true; } else { return true; }});
    
        if(!noteDeleted) { 
            res.sendStatus(404);
            return false; };

        fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify({ notes: notes }, null, 2)
        );

        if(noteDeleted) { res.sendStatus(200) } else { res.sendStatus(404)}
});

//Get all notes
app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

// Save a note
app.post('/api/notes', (req, res) => {

    let results = notes;
    let note = req.body;
    
    // Adds a unique id to each note created
    note.id = uuidv4();

    // Adds the note to the array
    results.push(note)
    
    // Re-write the json file with the current array data
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: results }, null, 2)
    );

    res.json(note);
});

// Directs the /notes to then notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Directs the address to the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// Wildcard redirects to landing page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})
