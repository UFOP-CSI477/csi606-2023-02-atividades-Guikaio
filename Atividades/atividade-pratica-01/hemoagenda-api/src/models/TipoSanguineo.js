import mongoose from "mongoose";

const { Schema } = mongoose;

const tipoSanguineoSchema = new Schema({
  id: { type: String },
  tipo: { type: String, require: true },
  fator: { type: String, require: true },
  created_at: { type: Date, default: Date.now, require: true },
  updated_at: { type: Number, default: Date.now, require: true },
});

const tiposSanguineos = mongoose.model("tipossanguineos", tipoSanguineoSchema);

export default tiposSanguineos;

// 65cb4900ce6152e9d376627f
// 65cb4964ce6152e9d3766281
