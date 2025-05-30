import Note from './models.js';

export async function getNotes(req, res) {
    try {
        const notes = await Note.find({}, { _id: 0 }).sort('id'); // прибираємо _id з відповіді
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get notes' });
    }
}

export async function getNoteById(req, res) {
    try {
        const noteId = parseInt(req.params.id);
        if (isNaN(noteId)) {
            return res.status(400).json({ error: 'Invalid note ID' });
        }

        const note = await Note.findOne({ id: noteId }, { _id: 0 });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get note' });
    }
}

// POST /note
export async function addNote(req, res) {
    try {
        const { title, text } = req.body;
        if (!title || !text) {
            return res.status(400).json({ error: 'title and text required' });
        }
        const note = await Note.create({ title, text });
        const response = {
            id: note.id,
            title: note.title,
            text: note.text,
            createdAt: note.createdAt
        };
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
}
