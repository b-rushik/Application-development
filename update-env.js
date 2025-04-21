const fs = require('fs');

const updateEnv = () => {
  try {
    const stackOutputs = JSON.parse(fs.readFileSync('stack-outputs.json', 'utf8'));
    const envFile = '.env';
    
    let envContent = '';
    
    stackOutputs.forEach(output => {
      switch(output.OutputKey) {
        case 'UserPoolId':
          envContent += `VITE_COGNITO_USER_POOL_ID=${output.OutputValue}\n`;
          break;
        case 'UserPoolClientId':
          envContent += `VITE_COGNITO_CLIENT_ID=${output.OutputValue}\n`;
          break;
        case 'S3BucketName':
          envContent += `VITE_S3_BUCKET=${output.OutputValue}\n`;
          break;
        case 'ApiEndpoint':
          envContent += `VITE_API_ENDPOINT=${output.OutputValue}\n`;
          break;
        case 'Region':
          envContent += `VITE_AWS_REGION=${output.OutputValue}\n`;
          break;
      }
    });
    
    fs.writeFileSync(envFile, envContent);
    console.log('Environment variables updated successfully');
  } catch (error) {
    console.error('Error updating environment variables:', error);
    process.exit(1);
  }
};

updateEnv();