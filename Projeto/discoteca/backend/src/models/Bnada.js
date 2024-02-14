import mongoose from "mongoose";

const { Schema } = mongoose;

const bandaSchema = new Schema({
  id: { type: String },
  nome: { type: String, require: true },
});

const bandas = mongoose.model("bandas", bandaSchema);

export default bandas;
