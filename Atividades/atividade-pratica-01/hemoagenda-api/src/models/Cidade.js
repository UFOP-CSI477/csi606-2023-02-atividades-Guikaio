import mongoose from "mongoose";

const { Schema } = mongoose;

const cidadeSchema = new Schema({
  id: { type: String },
  nome: { type: String, require: true },
  estado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "estados",
    require: true,
  },
  created_at: { type: Date, default: Date.now, require: true },
  updated_at: { type: Number, default: Date.now, require: true },
});

const cidades = mongoose.model("cidades", cidadeSchema);

export default cidades;
