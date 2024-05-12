import axios from 'axios';
import { request } from 'http';
import AWS from 'aws-sdk';
import { RcFile } from 'antd/es/upload';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_S3_REGION,
});

const s3 = new AWS.S3();

interface PersonalInfoFormValues {
  fullName?: string;
  phoneNumber?: string;
  address?: string;

  gender?: string;
  avatar?: string;
}

// This function now takes an idToken parameter (which is a string) and uses it in the request headers
export const fetchUserData = async (idToken: string) => {
  const apiEndpoint = 'https://cangcadanang.asia/backend/api/User/me';
  try {
    const response = await axios.get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${idToken}`, // Use the idToken in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    // handle error
    console.error(error);
    throw error; // re-throw the error to be handled by the caller
  }
};

export const updateUserData = async (idToken: string, updateData: PersonalInfoFormValues) => {
  const apiEndpoint = 'https://cangcadanang.asia/backend/api/User/me';
  try {
    const response = await axios.patch(apiEndpoint, updateData, {
      // Include the updateData in the request
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    // handle error
    console.error(error);
    throw error; // re-throw the error to be handled by the caller
  }
};

export const extractKey = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    // The pathname part of the URL includes the key but has a leading slash, remove it.
    let key = parsedUrl.pathname.substring(1);

    // Define the bucket name to remove, ensuring to include the trailing slash for accuracy.
    const bucketNameToRemove = 'dpm.bucket/';

    // Remove the defined bucket name from the beginning of the key, if present.
    key = key.replace(bucketNameToRemove, '');

    return key;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return ''; // Return an empty string in case of error.
  }
};

export const uploadImageToS3 = async (file: RcFile, originalFileName: string) => {
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME || 'dpm.bucket',
    Key: originalFileName, // Directly use the originalFileName as the Key
    Body: file,
    ContentType: file.type, // Ensure the ContentType is set to the file's type
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    console.log('Upload successful', uploadResult);
    return uploadResult;
  } catch (error) {
    console.error('Error uploading to S3', error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
