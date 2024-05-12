

const BASE_URL = 'https://cangcadanang.asia/backend/api';
// https://cangcadanang.asia/backend/api/Registration/arrival/all
export async function getAllArrival(idToken: any): Promise<any> {
  const url = `${BASE_URL}/Registration/arrival/all`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData: any = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching arrival data:', error);
    throw error;
  }
}
