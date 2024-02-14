import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

async function adicionarDoacao(doacao) {
  try {
    const res = await axios.post(`${API_BASE_URL}/doacoes`, doacao, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function buscarDoacoes() {
  try {
    const res = await axios.get(`${API_BASE_URL}/doacoes`);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function buscarDoacaoPorId(id) {
  try {
    const res = await axios.get(`${API_BASE_URL}/doacoes/${id}`);
    return res.data;
    
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function atualizarDoacao(id, doacao) {
  try {
    const res = await axios.put(`${API_BASE_URL}/doacoes/${id}`, doacao, {
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

async function deletarDoacao(id) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/doacoes/${id}`);

    console.log(res);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export {
  adicionarDoacao,
  buscarDoacoes,
  buscarDoacaoPorId,
  atualizarDoacao,
  deletarDoacao,
};
