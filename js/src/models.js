import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    title: String,
    text: String,
    createdAt: { type: Date, default: () => new Date() }
}, {
    versionKey: false  // Вимикаємо __v поле
});

NoteSchema.pre('save', async function(next) {
    if (this.isNew) {
        // Знаходимо останню нотатку з найбільшим ID
        const lastNote = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
        this.id = lastNote ? lastNote.id + 1 : 1;
    }
    next();
});

export default mongoose.model('Note', NoteSchema);
