const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
let notes  = require(`./db/db.json`);

//instantiates the server 
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


function createNewNote(body, notes) {
    const note = body
    notes.push(note)
    console.log(notes)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        // './Develop/db/db.json',
        JSON.stringify(notes, null, 2)
    );
    return note;
};

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

//creates data in a file
app.post('/api/notes', (req, res) => {
    
    //creates a unique id for newly posted notes.
    const id = uuidv4()
    const userNote = req.body
    userNote.id = id;
    //writes new notes to thje db.json file
    const note = createNewNote(userNote, notes)
    res.json(note)
    

});

// deletes data from the file
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(element => element.id === id); 
    if(!note) { 
            return res.status(404).json({error: 'No note found.', success: false})
    }
        
    //finds the element with the matching id and removes it from the updatedData
    notes = notes.filter(element => element.id !== id)

    fs.writeFile(
        path.join(__dirname, './db/db.json'),
        // './Develop/db/db.json',
        JSON.stringify(notes, null, 2),
        (err) => {
            if(err) throw err;  
            res.status(200).json(notes);
        }
        
    );
})
        
        
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
});

