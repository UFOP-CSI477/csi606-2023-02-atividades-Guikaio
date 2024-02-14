import doacoes from "../models/Doacao.js"

async function deleteVariasDoacoes(prop, propValue) {
  try {
    await doacoes.deleteMany({ [prop]: propValue });
  } catch (err) {
    console.error(err);
  }
}

export { deleteVariasDoacoes };
