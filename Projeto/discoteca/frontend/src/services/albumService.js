import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

async function getAllAlbunsService() {
  try {
    const res = await axios.get(`${API_BASE_URL}/albuns`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

async function addAlbumService(albumData) {
  try {
    const res = await axios.post(`${API_BASE_URL}/albuns`, albumData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

async function getAlbumByIdService(id) {
  try {
    const res = await axios.get(`${API_BASE_URL}/albuns/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

async function updateAlbumService(id, albumData) {
  try {
    const res = await axios.put(`${API_BASE_URL}/albuns/${id}`, albumData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

async function deleteAlbumService(id) {
  try {
    await axios.delete(`${API_BASE_URL}/albuns/${id}`);
  } catch (err) {
    throw err;
  }
}

export {
  getAllAlbunsService,
  getAlbumByIdService,
  addAlbumService,
  updateAlbumService,
  deleteAlbumService,
};
