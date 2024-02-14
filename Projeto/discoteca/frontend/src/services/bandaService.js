import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

async function getAllBandasService() {
  try {
    const res = await axios.get(`${API_BASE_URL}/bandas`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

async function addBandaService(bandaData) {
  try {
    const res = await axios.post(`${API_BASE_URL}/bandas`, bandaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

async function getBandaByIdService(id) {
  try {
    const res = await axios.get(`${API_BASE_URL}/bandas/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

async function updateBandaService(id, bandaData) {
  try {
    await axios.put(`${API_BASE_URL}/bandas/${id}`, bandaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    throw err;
  }
}

async function deleteBandaService(id) {
  try {
    await axios.delete(`${API_BASE_URL}/bandas/${id}`);
  } catch (err) {
    throw err;
  }
}

export {
  getAllBandasService,
  getBandaByIdService,
  addBandaService,
  updateBandaService,
  deleteBandaService,
};
