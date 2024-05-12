import { retrieveImageFromS3 } from './user.api';

const BASE_URL = 'https://cangcadanang.asia/backend/api';
const idToken = localStorage.getItem('idToken');

export async function getAllShips(): Promise<any[]> {
  try {
    const url = `${BASE_URL}/Ship/all`;
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

    const { result }: { result: any[] } = await response.json();

    const shipsWithImages = await Promise.all(
      result.map(async (ship) => {
        // Check if imagePath exists and is not simply a placeholder string
        if (ship.imagePath && ship.imagePath !== 'string') {
          const imageUrl = await retrieveImageFromS3(ship.imagePath);
          return { ...ship, imagePath: imageUrl };
        }
        return ship;
      }),
    );
    console.log('Manipulated ship data:', shipsWithImages);
    return shipsWithImages;
  } catch (error) {
    console.error('Error fetching ships data:', error);
    throw error;
  }
}

export async function getAllShipsForMap(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const url = `${BASE_URL}/Ship/all`;

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
        resolve(responseData);
        console.log('data ship from API:', responseData);
      } catch (error) {
        console.error('Error fetching ship data:', error);
      }
    }, 0);
  });
}
