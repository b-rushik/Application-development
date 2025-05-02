import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const ddb = DynamoDBDocument.from(new DynamoDB({}));
const TABLE_NAME = process.env.USERS_TABLE_NAME;

export const handler = async (event: any) => {
  try {
    const userData = JSON.parse(event.body);
    
    const item = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      name: userData.name,
      createdAt: new Date().toISOString(),
      isVerified: false,
      ...userData
    };

    await ddb.put({
      TableName: TABLE_NAME!,
      Item: item
    });

    return {
      statusCode: 201,
      body: JSON.stringify(item)
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to create user' })
    };
  }
};