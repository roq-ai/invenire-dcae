import axios from 'axios';
import queryString from 'query-string';
import { CriteriaInterface, CriteriaGetQueryInterface } from 'interfaces/criteria';
import { GetQueryInterface } from '../../interfaces';

export const getCriteria = async (query?: CriteriaGetQueryInterface) => {
  const response = await axios.get(`/api/criteria${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCriteria = async (criteria: CriteriaInterface) => {
  const response = await axios.post('/api/criteria', criteria);
  return response.data;
};

export const updateCriteriaById = async (id: string, criteria: CriteriaInterface) => {
  const response = await axios.put(`/api/criteria/${id}`, criteria);
  return response.data;
};

export const getCriteriaById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/criteria/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCriteriaById = async (id: string) => {
  const response = await axios.delete(`/api/criteria/${id}`);
  return response.data;
};
