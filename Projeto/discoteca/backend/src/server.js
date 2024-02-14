// app.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import albunsRoutes from "./routes/albunsRoutes.js"
import bandasRoutes from "./routes/bandasRoutes.js"
import db from './config/conexaoDb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão com o MongoDB feita com sucesso');
});

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(join(__dirname, '../uploads')));
app.use(albunsRoutes);
app.use(bandasRoutes);


const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
