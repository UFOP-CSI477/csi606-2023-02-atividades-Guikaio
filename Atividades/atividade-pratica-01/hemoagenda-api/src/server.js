import express from 'express';
import cors from 'cors';

import cidadesRoutes from "./routes/cidadesRoutes.js";
import doacoesRoutes from "./routes/doacoesRoutes.js";
import estadosRoutes from "./routes/estadosRoutes.js";
import locaisColetaRoutes from "./routes/locaisColetaRoutes.js";
import pessoasRoutes from "./routes/pessoasRoutes.js";
import tiposSanguineosRoutes from "./routes/tiposSanguineosRoutes.js";

import db from './config/conexaoDb.js';


const app = express();

db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão com o MongoDB feita com sucesso');
});

app.use(express.json());
app.use(cors());
app.use(cidadesRoutes);
app.use(doacoesRoutes);
app.use(estadosRoutes);
app.use(locaisColetaRoutes);
app.use(pessoasRoutes);
app.use(tiposSanguineosRoutes);



const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
