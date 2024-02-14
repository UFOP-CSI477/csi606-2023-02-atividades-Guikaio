import mongoose from "mongoose";

const { Schema } = mongoose;

const bandaSchema = new Schema({
  id: { type: String },
  data: { type: Date, require: true },
  pessoa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pessoas",
    require: true,
  },
  localColeta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "locaiscoleta",
    require: true,
  },
  created_at: { type: Date, default: Date.now, require: true },
  updated_at: { type: Number, default: Date.now, require: true },
});

const bandas = mongoose.model("doacoes", bandaSchema);

export default bandas;
