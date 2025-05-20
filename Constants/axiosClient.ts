import axios from 'axios';
import { API_BASE_URL } from './APIConstant';
import { _retrieveData } from '../Utils/StoragePreference';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

