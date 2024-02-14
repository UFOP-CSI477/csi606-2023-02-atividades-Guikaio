import mongoose from "mongoose";

const { Schema } = mongoose;

const localColetaSchema = new Schema({
  id: { type: String },
  nome: { type: String, require: true },
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

const locaiscoleta = mongoose.model("locaiscoleta", localColetaSchema);

export default locaiscoleta;
