const fs = require('fs');
const path = require('path');

// Misc functions

function saveNoteFile(notes) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notes }, null, 2)
    );
  }


  module.exports = { saveNoteFile }