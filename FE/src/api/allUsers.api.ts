import { retrieveImageFromS3 } from './user.api';

const BASE_URL = 'https://cangcadanang.asia/backend/api';
// https://cangcadanang.asia/backend/api/Registration/arrival/all
export async function getAllUsers(idToken: string): Promise<any[]> {
  const url = `${BASE_URL}/User/all`;

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

    const { result }: { result: any[] } = await response.json();

    // Use Promise.all to construct a new array with avatar image URLs
    const usersWithAvatars = await Promise.all(
      result.map(async (user) => {
        if (user.avatar && user.avatar !== 'string') {
          const avatarUrl = await retrieveImageFromS3(user.avatar);
          return { ...user, avatar: avatarUrl };
        }
        return user;
      }),
    );

    return usersWithAvatars;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
