import express from 'express';
const router = express.Router();
import deepgramRouter from './deepgram.js'
import sentenceRouter from './sentence.js'


router.use('/audio',deepgramRouter);
router.use('/sentence',sentenceRouter);


export default router