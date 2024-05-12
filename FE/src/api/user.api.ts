import { S3, config } from 'aws-sdk';

config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, // Use environment variable for your actual access key ID
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY, // Use environment variable for your actual secret access key
  region: process.env.REACT_APP_S3_REGION, // Use environment variable for the region your S3 bucket is in, e.g., 'us-east-1'
});

export const retrieveImageFromS3 = async (key: string): Promise<string> => {
  const s3 = new S3();
  const bucketName = process.env.REACT_APP_S3_BUCKET;

  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const signedUrl = await s3.getSignedUrlPromise('getObject', params);
    console.log(signedUrl);
    return signedUrl;
  } catch (error) {
    console.error('Error retrieving image from S3:', error);
    throw new Error('Failed to retrieve image from S3');
  }
};
