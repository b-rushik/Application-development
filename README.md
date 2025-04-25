# Gyaan Kriti - Exam Paper Management System

A secure and efficient platform for creating, distributing, and managing exam papers for educational institutions.

## Overview

Gyaan Kriti is a multi-user website with four distinct user roles (Paper Setter, Paper Getter, Admin, and Super User) designed to streamline the exam paper management process for educational institutions.

## Features

- User management system with role-based access control
- Secure authentication with email verification
- Question paper upload, review, and approval workflow
- Paper Setter matching based on expertise and difficulty level
- Rating and feedback system for quality control
- Secure document storage and delivery with timed access

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: AWS Services (Cognito, DynamoDB, S3, Lambda, API Gateway, SES)
- **Deployment**: AWS Amplify

## Deployment Instructions

### Prerequisites

1. AWS Account with appropriate permissions
2. Git repository containing this code
3. Node.js and npm installed locally

### Frontend Deployment (AWS Amplify Gen 2)

1. Create a new AWS Amplify Gen 2 app in the AWS Console
2. Connect your GitHub repository
3. Use the following settings:
   - Region: ap-south-1
   - Build settings: Use the provided `amplify.yml` file
   - Environment variables: No environment variables needed

4. After deployment, note the URL for your application

### Backend Deployment (CloudFormation)

1. Log in to the AWS Console and navigate to CloudFormation
2. Create a new stack using the `cloudformation/backend.yml` template
3. Set the following parameter:
   - Environment: dev (or your preferred environment name)

4. Wait for the stack to complete creation
5. Note the outputs from the CloudFormation stack:
   - UserPoolId
   - UserPoolClientId
   - IdentityPoolId
   - DocumentsBucketName
   - ApiGatewayEndpoint

### Connecting Frontend to Backend

1. After both deployments are complete, navigate to the Amplify Console
2. Modify `src/main.tsx` to include the actual values from the CloudFormation outputs:
   - Update `userPoolId` with the actual User Pool ID
   - Update `userPoolWebClientId` with the actual User Pool Client ID
   - Update `bucket` with the actual Documents Bucket name
   - Update `identityPoolId` with the actual Identity Pool ID

3. Commit and push these changes to your repository
4. Amplify will automatically redeploy your application with the updated configuration

## Post-Deployment Setup

1. Create a Super User account using the hardcoded credentials:
   - Email: rushikburla2019@gmail.com
   - Password: Gyaan-kriti@123

2. Create Admin accounts using the specific hardcoded email:
   - Email: kattyperry123@gmail.com

3. Set up SES to enable email sending capabilities:
   - Verify email identities in SES
   - Request production access if needed

## Additional Configuration

For the email functionality to work properly, you will need to:

1. Configure Amazon SES in the ap-south-1 region
2. Verify the domain you're using for sending emails (organization-domain-name.com)
3. If your account is in the SES sandbox, verify all recipient email addresses

## Security Notes

- The application uses Cognito for authentication and authorization
- DynamoDB tables have appropriate access controls
- S3 bucket is configured with proper security settings
- All secrets are managed through AWS services, not in code

## Maintenance

- Regularly update dependencies
- Monitor CloudWatch logs for errors
- Set up CloudWatch alarms for critical functions
- Regularly backup DynamoDB tables