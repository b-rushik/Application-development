import { S3 } from '@aws-sdk/client-s3';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const s3 = new S3({});
const ddb = DynamoDBDocument.from(new DynamoDB({}));
const PAPERS_TABLE = process.env.PAPERS_TABLE_NAME;
const S3_BUCKET = process.env.S3_BUCKET_NAME;

export const handler = async (event: any) => {
  try {
    const paperId = event.pathParameters.id;
    
    // Get paper details from DynamoDB
    const paper = await ddb.get({
      TableName: PAPERS_TABLE!,
      Key: { id: paperId }
    });

    if (!paper.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Paper not found' })
      };
    }

    // Generate presigned URL for file download
    const downloadUrl = await s3.getSignedUrl('getObject', {
      Bucket: S3_BUCKET,
      Key: paper.Item.fileKey,
      Expires: 3600 // URL expires in 1 hour
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ downloadUrl })
    };
  } catch (error) {
    console.error('Error generating download URL:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to generate download URL' })
    };
  }
};