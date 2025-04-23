import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.AMPLIFY_AUTH_USER_POOL_ID,
      userPoolClientId: process.env.AMPLIFY_AUTH_USER_POOL_CLIENT_ID,
      signUpVerificationMethod: 'code',
      region: 'ap-south-1'
    }
  },
  Storage: {
    S3: {
      bucket: process.env.AMPLIFY_STORAGE_BUCKET,
      region: 'ap-south-1'
    }
  }
});

cognitoUserPoolsTokenProvider.setKeyValueStorage({
  getItem(key: string) {
    return localStorage.getItem(key);
  },
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
});

export { uploadData, getUrl, remove };