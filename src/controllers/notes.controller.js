const notesCtrl = {};
const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-notes');
};

notesCtrl.createNewNote = async (req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    await newNote.save();
    req.flash('success_msg','Note Added Successfully');
    res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res) => {
    try {
        const notes = await Note.find().lean().exec(); // Usamos lean() para convertir los documentos en objetos JavaScript estándar
        res.render('notes/all-notes', { notes }); // Pasamos los datos a la plantilla
    } catch (error) {
        // Manejamos cualquier error que ocurra
        console.error('Error al obtener las notas:', error);
        res.status(500).send('Error al obtener las notas');
    }
};



notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean().exec();
    res.render('notes/edit-note', { note });
};

notesCtrl.updateNote = async (req, res) => {
    const {title,description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description}); 
    req.flash('success_msg','Note Update Successfully');
    res.redirect('/notes');
};

notesCtrl.deletenote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Note Delete Successfully');
    res.redirect('/notes');
};



module.exports = notesCtrl;