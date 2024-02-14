import mongoose from "mongoose";

const { Schema } = mongoose;

const estadoSchema = new Schema({
  id: { type: String },
  nome: { type: String, require: true },
  sigla: { type: String, require: true },
  created_at: { type: Date, default: Date.now, require: true },
  updated_at: { type: Number, default: Date.now, require: true },
});

const estados = mongoose.model("estados", estadoSchema);

export default estados;
