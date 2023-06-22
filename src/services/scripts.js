import axios from "axios";
const baseUrl = "http://localhost:3001/scripts";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  update,
  remove
};
