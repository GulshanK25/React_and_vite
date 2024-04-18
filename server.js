import express from 'express';
import dotenv from "dotenv";
import { connectdb } from './config/dbconnection.js';
import path from 'path';
import { fileURLToPath } from 'url'; 
import cors from 'cors';
import router from './routes/routes.js';
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 


dotenv.config();
const app = express()
const port = 5000 || process.env.PORT;
connectdb()
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"dist")))

app.use("/api",router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))