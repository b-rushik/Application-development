import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';

// Access environment variables directly from Amplify Gen2
const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AMPLIFY_AUTH_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AMPLIFY_AUTH_USER_POOL_CLIENT_ID,
      signUpVerificationMethod: 'code',
      region: 'ap-south-1'
    }
  },
  Storage: {
    S3: {
      bucket: import.meta.env.VITE_AMPLIFY_STORAGE_BUCKET,
      region: 'ap-south-1'
    }
  }
};

Amplify.configure(amplifyConfig);

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