import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { S3 } from '@aws-sdk/client-s3';

const ddb = DynamoDBDocument.from(new DynamoDB({}));
const s3 = new S3({});
const PAPERS_TABLE = process.env.PAPERS_TABLE_NAME;
const S3_BUCKET = process.env.S3_BUCKET_NAME;

export const handler = async (event: any) => {
  try {
    const { paperData, fileKey } = JSON.parse(event.body);
    
    const item = {
      id: paperData.id,
      subject: paperData.subject,
      submittedBy: paperData.submittedBy,
      requestedBy: paperData.requestedBy,
      fileKey,
      status: 'pending',
      submittedDate: new Date().toISOString(),
      examDate: paperData.examDate
    };

    await ddb.put({
      TableName: PAPERS_TABLE!,
      Item: item
    });

    // Generate presigned URL for file upload
    const uploadUrl = await s3.getSignedUrl('putObject', {
      Bucket: S3_BUCKET,
      Key: fileKey,
      Expires: 3600, // URL expires in 1 hour
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        paper: item,
        uploadUrl
      })
    };
  } catch (error) {
    console.error('Error submitting paper:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to submit paper' })
    };
  }
};