import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

async function adicionarLocalColeta(localColeta) {
  try {
    const res = await axios.post(`${API_BASE_URL}/locaiscoleta`, localColeta, {
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

async function buscaLocaisColeta() {
  try {
    const res = await axios.get(`${API_BASE_URL}/locaiscoleta`);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function buscaLocalColetaPorId(id) {
  try {
    const res = await axios.get(`${API_BASE_URL}/locaiscoleta/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function atualizaLocalColeta(id, localColeta) {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/locaiscoleta/${id}`,
      localColeta,
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

async function deletaLocalColeta(id) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/locaiscoleta/${id}`);

    console.log(res);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export {
  adicionarLocalColeta,
  buscaLocaisColeta,
  buscaLocalColetaPorId,
  atualizaLocalColeta,
  deletaLocalColeta,
};
