import express from 'express';
import { textToAudio } from '../controllers/deepgram.js';

const router = express.Router();
router.route('/text-to-audio').get(textToAudio);



export default router;