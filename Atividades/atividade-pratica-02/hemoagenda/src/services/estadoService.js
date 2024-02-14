import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

async function adicionarEstado(estado) {
  try {
    const res = await axios.post(`${API_BASE_URL}/estados`, estado, {
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

async function buscarEstados() {
  try {
    const res = await axios.get(`${API_BASE_URL}/estados`);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function buscaEstadoPorId(id) {
  try {
    const res = await axios.get(`${API_BASE_URL}/estados/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function atualizaEstado(id, estado) {
  try {
    const res = await axios.put(`${API_BASE_URL}/estados/${id}`, estado, {
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

async function deletarEstado(id) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/estados/${id}`);

    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export {
  adicionarEstado,
  buscarEstados,
  buscaEstadoPorId,
  atualizaEstado,
  deletarEstado,
};
