import axios from 'axios';
import qs from 'qs';
import { v4 } from 'uuid';

import { IADTokenConfig } from './ADTokenConfig';
import { IADTokenResponse } from './IADTokenResponse';

export async function getADToken(config: IADTokenConfig): Promise<IADTokenResponse> {
  // // Your app's OIDC client ID
  const CLIENT_ID = config.TEST_AD_CLIENT_ID;
  const CLIENT_SECRET = config.TEST_AD_CLIENT_SECRET;
  const USERNAME = config.TEST_USERNAME;
  const PASSWORD = config.TEST_PASSWORD;

  // A redirect URI, also explicitly defined in the Azure AD OIDC app
  const REDIRECT_URI = 'https://customer-nonprod.energyaustralia.com.au/cdr/agent/';
  const TOKEN_URL = 'https://login.microsoftonline.com/7a04d7f3-5040-4e4c-8f55-293ed3c7df84/oauth2/v2.0/token';

  const data = qs.stringify({
    username: USERNAME,
    password: PASSWORD,
    scope: `api://${CLIENT_ID}/default`,
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state: v4(),
    nonce: v4(),
    code_challenge_method: 'S256',
    client_secret: CLIENT_SECRET,
    grant_type: 'password',
  });
  const axiosConfig = {
    method: 'post',
    url: TOKEN_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  try {
    const res = await axios(axiosConfig);
    return res.data;
  } catch (err) {
    throw new Error(err as string);
  }
}
