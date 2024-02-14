import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

async function adicionarTipoSanguineo(tipoSanguineo) {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/tipossanguineos`,
      tipoSanguineo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function buscarTiposSanguineos() {
  try {
    const res = await axios.get(`${API_BASE_URL}/tipossanguineos`);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function buscarTipoSanguineoPorId(id) {
  try {
    const res = await axios.get(`${API_BASE_URL}/tipossanguineos/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function atualizarTipoSanguineo(id, tipoSanguineo) {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/tipossanguineos/${id}`,
      tipoSanguineo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function deletarTipoSanguineo(id) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/tipossanguineos/${id}`);

    console.log(res);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export {
  adicionarTipoSanguineo,
  buscarTiposSanguineos,
  buscarTipoSanguineoPorId,
  atualizarTipoSanguineo,
  deletarTipoSanguineo,
};
