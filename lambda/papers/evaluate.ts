import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const ddb = DynamoDBDocument.from(new DynamoDB({}));
const PAPERS_TABLE = process.env.PAPERS_TABLE_NAME;

export const handler = async (event: any) => {
  try {
    const paperId = event.pathParameters.id;
    const { rating, feedback, status } = JSON.parse(event.body);

    const result = await ddb.update({
      TableName: PAPERS_TABLE!,
      Key: { id: paperId },
      UpdateExpression: 'set rating = :r, feedback = :f, status = :s, evaluatedAt = :e',
      ExpressionAttributeValues: {
        ':r': rating,
        ':f': feedback,
        ':s': status,
        ':e': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
  } catch (error) {
    console.error('Error evaluating paper:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to evaluate paper' })
    };
  }
};