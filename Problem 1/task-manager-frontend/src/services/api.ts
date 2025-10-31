import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks'; // update port if different

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (task: { description: string }) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const toggleTask = async (id: number) => {
  const response = await axios.put(`${API_URL}/${id}/toggle`);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
