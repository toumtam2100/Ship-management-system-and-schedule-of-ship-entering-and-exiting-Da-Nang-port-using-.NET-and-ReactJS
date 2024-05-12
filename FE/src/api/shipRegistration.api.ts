import axios from 'axios';
import { Priority } from '../constants/enums/priorities';

export interface Tag {
  value: string;
  priority: Priority;
}

export interface Ship {
  imagePath?: string; 
  ownerId: number;
  name: string;
  imoNumber: string;
  registerNumber: string;
  shipType: string;
  length: string;
  grossTonnage: string;
  purpose?: string;
}
export const registerShip = async (shipData: Ship): Promise<void> => {
  try {
    const idToken = localStorage.getItem('idToken');
    const response = await axios.post('https://cangcadanang.asia/backend/api/Ship/create', shipData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const responseData = response.data;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Failed to register ship:', error.response.data);
    } else {
      console.error('Failed to register ship:', error);
    }
    throw new Error('Failed to register ship');
  }
};