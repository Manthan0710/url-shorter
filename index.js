import  express  from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import  urlRoutes  from "./routes/urlRoutes.js";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
// Needed for ES modules to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // for JSON body parsing
app.use(express.static(path.join(__dirname, 'public'))); // serve static files

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017', {
    dbName: "URLs"
}).then(c => console.log(`DB connect  to ${c.connection.host} `))
    .catch(e => console.log(e));


// Serve HTML file on "/"
app.get('/api/get', (req, res) => {
  console.log('check')
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/',urlRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
