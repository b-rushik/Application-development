import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    region: import.meta.env.VITE_AWS_REGION,
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
  },
  Storage: {
    AWSS3: {
      bucket: import.meta.env.VITE_S3_BUCKET,
      region: import.meta.env.VITE_AWS_REGION,
    }
  },
  API: {
    endpoints: [
      {
        name: 'qpmsApi',
        endpoint: import.meta.env.VITE_API_ENDPOINT,
        region: import.meta.env.VITE_AWS_REGION,
      },
    ]
  }
};

Amplify.configure(awsConfig);

export default awsConfig;