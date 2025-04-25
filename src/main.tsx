import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import App from './App.tsx';
import './index.css';

// Configure Amplify
Amplify.configure({
  Auth: {
    region: 'ap-south-1',
    userPoolId: 'ap-south-1_AnlDE8FZs', // This will be replaced with actual pool ID from CFT
    userPoolWebClientId: '2e0gb13mtqpgcuo4vhjkpit5es', // This will be replaced with actual client ID from CFT
    mandatorySignIn: true,
  },
  Storage: {
    region: 'ap-south-1',
    bucket: 'gyaan-kriti-documents', // This will be replaced with actual bucket name from CFT
    identityPoolId: 'ap-south-1:239c23bc-906d-4005-8b00-6ddea1e28398', // This will be replaced with actual identity pool ID from CFT
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);