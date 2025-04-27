import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// AWS Amplify Configuration
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'ap-south-1',
    userPoolId: 'ap-south-1_xxxxxxxxxxxx', // This will be replaced during deployment
    userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxx', // This will be replaced during deployment
    mandatorySignIn: true,
  },
  Storage: {
    region: 'ap-south-1',
    bucket: 'gyaankriti-files', // This will be replaced during deployment
    identityPoolId: 'ap-south-1:xxxxxxxxxxxx', // This will be replaced during deployment
  },
  API: {
    endpoints: [
      {
        name: 'gyaankriti',
        endpoint: 'https://xxxxxxxxxx.execute-api.ap-south-1.amazonaws.com/prod', // This will be replaced during deployment
        region: 'ap-south-1',
      },
    ],
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);