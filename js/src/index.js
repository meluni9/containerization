import express from 'express';
import mongoose from 'mongoose';
import noteRouter from './routes.js';

const app = express();
app.use(express.json());
app.use('/note', noteRouter);

await mongoose.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/lab3');

app.get('/', (req, res) => {
    res.json({
        message: 'Notes API',
        endpoints: {
            'GET /note': 'Get all notes',
            'POST /note': 'Create new note'
        }
    });
});

app.listen(3000, () => console.log('Listening on http://0.0.0.0:3000'));
