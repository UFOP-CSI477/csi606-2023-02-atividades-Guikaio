import pessoas from "../models/Pessoa.js"
import { deleteVariasDoacoes } from "./deleteVariasDoacoes.js";

async function deleteVariasPessoas(prop, propValue) {
  try {
    const pessoasEncontradas = await pessoas.find({ [prop]: propValue });
    pessoasEncontradas.map(async (pessoa) => {
      await deleteVariasDoacoes("pessoa", pessoa._id)
      await pessoas.deleteOne({"_id" : pessoa._id})
    })
  } catch (err) {
    console.error(err);
  }
}

export { deleteVariasPessoas };
