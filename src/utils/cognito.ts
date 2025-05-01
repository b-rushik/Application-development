import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

export const signUp = (email: string, password: string, attributes: Record<string, string>) => {
  return new Promise((resolve, reject) => {
    const attributeList = Object.entries(attributes).map(([key, value]) => 
      new CognitoUserAttribute({ Name: key, Value: value })
    );

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export const signIn = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve({
          token: result.getAccessToken().getJwtToken(),
          user: {
            email: email,
            sub: result.getAccessToken().payload.sub,
          }
        });
      },
      onFailure: (err) => {
        reject(err);
      }
    });
  });
};

export const signOut = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      resolve(null);
      return;
    }

    cognitoUser.getSession((err: any, session: any) => {
      if (err) {
        reject(err);
        return;
      }

      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err);
          return;
        }

        const userData = attributes?.reduce((acc: any, attr) => {
          acc[attr.getName()] = attr.getValue();
          return acc;
        }, {});

        resolve({
          ...userData,
          token: session.getAccessToken().getJwtToken()
        });
      });
    });
  });
};