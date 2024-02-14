import mongoose from "mongoose";

const { Schema } = mongoose;

const albumSchema = new Schema(
    {
        id: {type: String},
        titulo: {type: String, require: true},
        descricao: {type: String, require: true},
        capa: {type: String, require: true},
        preco: {type: Number, require: true},
        banda: {type: mongoose.Schema.Types.ObjectId, ref: "bandas", require: true}
    }
);

const albuns = mongoose.model('albuns', albumSchema);

export default albuns;