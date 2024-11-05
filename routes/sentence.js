import express from 'express';
import { getSentence } from '../controllers/sentnece.js';

const router = express.Router();
router.route('/get-sentence').get(getSentence);



export default router;