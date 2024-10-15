import axios from 'axios';

const API_URL = 'http://localhost:5000/viagens';

export const getViagens = () => axios.get(API_URL);
export const createViagem = (data) => axios.post(API_URL, data);
export const updateViagem = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteViagem = (id) => axios.delete(`${API_URL}/${id}`);
