import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

async function adicionaPessoa(pessoa) {
  try {
    const res = await axios.post(`${API_BASE_URL}/pessoas`, pessoa, {
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

async function buscaPessoas() {
  try {
    const res = await axios.get(`${API_BASE_URL}/pessoas`);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function buscaPessoaPorId(id) {
  try {
    const res = await axios.get(`${API_BASE_URL}/pessoas/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function atualizaPessoa(id, pessoa) {
  try {
    const res = await axios.put(`${API_BASE_URL}/pessoas/${id}`, pessoa, {
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

async function deletaPessoa(id) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/pessoas/${id}`);

    console.log(res);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export {
  adicionaPessoa,
  buscaPessoas,
  buscaPessoaPorId,
  atualizaPessoa,
  deletaPessoa,
};
