import express from 'express';
import router from './routes/index.js';
import { config } from 'dotenv';
config();


export const app = express();

app.use('',express.static('./public'))
app.use('/api/v1',router);
