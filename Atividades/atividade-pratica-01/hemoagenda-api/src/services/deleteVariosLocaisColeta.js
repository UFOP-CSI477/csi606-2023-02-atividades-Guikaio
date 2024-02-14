import locaiscoleta from "../models/LocalColeta.js";

async function deleteVariosLocaisColeta(cidadeId) {
  try {
    const locaisColetaEncontrados = await locaiscoleta.find({
      cidades: cidadeId,
    });
    locaisColetaEncontrados.map(async (localColeta) => {
      await deleteVariasDoacoes("locaiscoleta", localColeta._id);
      await locaiscoleta.deleteOne({"_id" : localColeta._id})
    });
  } catch (err) {
    console.error(err);
  }
}

export { deleteVariosLocaisColeta };
