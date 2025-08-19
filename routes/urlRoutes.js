import express from 'express'; 

import {checkStats, newUrl, redirectUrl} from "../contorllers/shortUrl.js";

const app = express.Router();

app.post('/shorten',newUrl);
app.get('/:shortCode',redirectUrl);
app.get('/stats/:shortCode',checkStats);

export default app;