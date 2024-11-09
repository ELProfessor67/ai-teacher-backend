import express from 'express';
import { getSentence,responseGenerator } from '../controllers/sentnece.js';

const router = express.Router();
router.route('/get-sentence').get(getSentence);
router.route('/get-response').post(responseGenerator);



export default router;