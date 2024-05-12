import AWS from 'aws-sdk';

// Configure AWS SDK with your S3 Region
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_S3_REGION,
});

const s3 = new AWS.S3();

// Function to upload a file to S3
export const uploadFileToS3 = (fileBlob: Blob, fileName: string): Promise<AWS.S3.ManagedUpload.SendData> => {
  // Define your S3 bucket name in the utils file
  const bucketName = 'dpm.bucket';

  const params: AWS.S3.Types.PutObjectRequest = {
    Bucket: bucketName,
    Key: `Registration/Arrival/sample-id/${fileName}`,
    Body: fileBlob,
  };

  // Return a promise to upload the file using s3.upload()
  return s3.upload(params).promise();
};
