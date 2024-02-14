import cidades from "../models/Cidade.js";
import { deleteVariasPessoas } from "./deleteVariasPessoas.js";
import { deleteVariosLocaisColeta } from "./deleteVariosLocaisColeta.js";

async function deleteVariasCidades(estadoId) {
  try {
    const cidadesEncontradas = await cidades.find({ estado: estadoId });
    cidadesEncontradas.map(async (cidade) => {
      await deleteVariasPessoas("cidades", cidade._id)
      await deleteVariosLocaisColeta("cidades", cidade._id)
      await cidades.deleteOne({"_id" : cidade._id})
    })
  } catch (err) {
    console.error(err);
  }
}

export { deleteVariasCidades };
