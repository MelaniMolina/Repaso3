const { Router } = require('express');
const router = Router();
const { renderNoteForm,
        createNewNote,
        renderNotes,
        renderEditForm,
        updateNote,
        deletenote
    } = require('../controllers/notes.controller');

//New Note
router.get('/notes/add', renderNoteForm);
router.post('/notes/new-notes', createNewNote);

//Get All Note
router.get('/notes', renderNotes);

//Edit Notes
router.get('/notes/edit/:id', renderEditForm);
router.put('/notes/edit/:id', updateNote);

//Delete Notes
router.delete('/notes/delete/:id', deletenote);

module.exports = router;