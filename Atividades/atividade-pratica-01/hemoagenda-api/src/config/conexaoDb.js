import mongoose from "mongoose";

mongoose.connect('mongodb+srv://GuilhermeKaio:86852519Ca@cluster0.4lbe8bd.mongodb.net/?retryWrites=true&w=majority');

let db = mongoose.connection;

export default db;
