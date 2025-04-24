import { Amplify } from '@aws-amplify/core';
import { cognitoUserPoolsTokenProvider } from '@aws-amplify/auth';
import { uploadData, getUrl, remove } from '@aws-amplify/storage';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'd1mkstdbgtpxy7_userpool_d1mkstdbgtpxy7-Fourth',
      userPoolClientId: '2g0j8l4q9t5v8n3k7m1p4r9h',
      signUpVerificationMethod: 'code',
      region: 'ap-south-1'
    }
  },
  Storage: {
    S3: {
      bucket: 'qpms-papers-Fourth-branch',
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