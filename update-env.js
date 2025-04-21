const fs = require('fs');
const path = require('path');

const updateEnv = () => {
  try {
    // Validate input file exists
    const stackOutputsPath = path.join(process.cwd(), 'stack-outputs.json');
    if (!fs.existsSync(stackOutputsPath)) {
      throw new Error('Stack outputs file not found');
    }

    // Read and parse stack outputs
    const stackOutputs = JSON.parse(fs.readFileSync(stackOutputsPath, 'utf8'));
    if (!Array.isArray(stackOutputs)) {
      throw new Error('Invalid stack outputs format');
    }

    const envFile = path.join(process.cwd(), '.env');
    let envContent = '';
    
    // Map CloudFormation outputs to environment variables
    const outputMapping = {
      'UserPoolId': 'VITE_COGNITO_USER_POOL_ID',
      'UserPoolClientId': 'VITE_COGNITO_CLIENT_ID',
      'S3BucketName': 'VITE_S3_BUCKET',
      'ApiEndpoint': 'VITE_API_ENDPOINT',
      'Region': 'VITE_AWS_REGION'
    };

    // Build environment variables content
    stackOutputs.forEach(output => {
      const envVar = outputMapping[output.OutputKey];
      if (envVar && output.OutputValue) {
        envContent += `${envVar}=${output.OutputValue}\n`;
      }
    });

    // Validate environment content
    if (!envContent) {
      throw new Error('No valid environment variables generated');
    }

    // Write to .env file
    fs.writeFileSync(envFile, envContent, { encoding: 'utf8', flag: 'w' });
    console.log('Environment variables updated successfully');

    // Verify file was written
    if (!fs.existsSync(envFile)) {
      throw new Error('Failed to write environment file');
    }

    const written = fs.readFileSync(envFile, 'utf8');
    if (!written) {
      throw new Error('Environment file is empty');
    }

  } catch (error) {
    console.error('Error updating environment variables:', error.message);
    process.exit(1);
  }
};

// Execute update
updateEnv();