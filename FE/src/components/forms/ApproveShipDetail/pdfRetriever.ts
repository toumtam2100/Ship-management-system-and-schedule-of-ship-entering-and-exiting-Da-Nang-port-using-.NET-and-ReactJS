import { S3 } from 'aws-sdk';

// Initialize an S3 client
const s3 = new S3({
  region: process.env.REACT_APP_S3_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const bucketName = 'dpm.bucket';

export async function retrievePdfFromS3(key: string): Promise<string | null> {
  const options = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const data = await s3.getObject(options).promise();
    // Convert the data to a Blob, which is used to create an object URL
    const blob = new Blob([data.Body as BlobPart], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error retrieving PDF from S3:', error);
    return null;
  }
}
