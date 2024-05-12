import axios from 'axios';

const BASE_URL = 'https://cangcadanang.asia/backend/api';

export interface CreateCrewData {
  fullName: string;
  countries: 'VN';
  nationalId: string;
  yearExperience: string;
  relativePhoneNumber: string;
}

export async function getAllCrew(idToken: any): Promise<any> {
  const url = `${BASE_URL}/Crew/all`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData: any = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching crew data:', error);
    throw error;
  }
}

export const createCrew = async (formData: CreateCrewData) => {
  console.log('inject data to createCrew:', formData);

  try {
    const idToken = localStorage.getItem('idToken');
    const response = await axios.post('https://cangcadanang.asia/backend/api/Crew/create', formData, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating crew', error);
  }
};
