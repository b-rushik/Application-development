import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import App from './App.tsx';
import './index.css';

// Configure Amplify
Amplify.configure({
  Auth: {
    region: 'ap-south-1',
    userPoolId: 'ap-south-1_XXXXXXXXX', // This will be replaced with actual pool ID from CFT
    userPoolWebClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX', // This will be replaced with actual client ID from CFT
    mandatorySignIn: true,
  },
  Storage: {
    region: 'ap-south-1',
    bucket: 'gyaan-kriti-documents', // This will be replaced with actual bucket name from CFT
    identityPoolId: 'ap-south-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', // This will be replaced with actual identity pool ID from CFT
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);