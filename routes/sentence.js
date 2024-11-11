import express from 'express';
import { getSentence,getLipsyncData } from '../controllers/sentnece.js';

const router = express.Router();
router.route('/get-sentence').get(getSentence);
router.route('/get-lipsync').post(getLipsyncData);



export default router;