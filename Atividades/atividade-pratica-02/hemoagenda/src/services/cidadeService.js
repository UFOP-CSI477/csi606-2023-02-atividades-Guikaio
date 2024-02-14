import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

async function adicionarCidade(cidade) {
  try {
    const res = await axios.post(`${API_BASE_URL}/cidades`, cidade, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

async function buscarCidades() {
  try {
    const res = await axios.get(`${API_BASE_URL}/cidades`);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function buscarCidadePeloId(id) {
  try {
    const res = await axios.get(`${API_BASE_URL}/cidades/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function atualizarCidade(id, cidade) {
  try {
    const res = await axios.put(`${API_BASE_URL}/cidades/${id}`, cidade, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function deletarCidade(id) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/cidades/${id}`);

    console.log(res);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export {
  adicionarCidade,
  buscarCidades,
  buscarCidadePeloId,
  atualizarCidade,
  deletarCidade,
};
