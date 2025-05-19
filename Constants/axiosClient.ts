import axios from 'axios';
import { API_BASE_URL } from './APIConstant';
import i18next from 'i18next';
import { TOKEN } from './KeyConstant';
import { _retrieveData } from '../Utils/StoragePreference';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

