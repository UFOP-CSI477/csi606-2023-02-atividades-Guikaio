import mongoose from "mongoose";

const { Schema } = mongoose;

const pessoaSchema = new Schema({
  id: { type: String },
  nome: { type: String, require: true },
  rg: { type: String, require: true },
  tipoSanguineo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tipossanguineos",
    require: true,
  },
  rua: { type: String, require: true },
  numero: { type: String, require: true },
  complemento: { type: String, require: true },
  cidade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cidades",
    require: true,
  },
  created_at: { type: Date, default: Date.now, require: true },
  updated_at: { type: Number, default: Date.now, require: true },
});

const pessoas = mongoose.model("pessoas", pessoaSchema);

export default pessoas;
