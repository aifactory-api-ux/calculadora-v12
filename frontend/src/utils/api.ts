import axios from 'axios';
import { CalculationRequest, CalculationResponse } from '../types/calculation';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export const api = {
  async calculate(data: CalculationRequest): Promise<CalculationResponse> {
    const response = await axios.post<CalculationResponse>(`${API_BASE_URL}/calculate`, data);
    return response.data;
  },

  async health(): Promise<{ status: string }> {
    const response = await axios.get<{ status: string }>(`${API_BASE_URL}/health`);
    return response.data;
  },
};