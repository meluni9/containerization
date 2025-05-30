import express from 'express';
import { getNotes, addNote, getNoteById } from './controllers.js';

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', getNoteById);

router.post('/', addNote);

export default router;
