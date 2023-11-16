import axios from 'axios';

import { ICETokenConfig } from './CETokenConfig';

export async function getConsentAccessToken(config: ICETokenConfig) {
  const CLOUD_ENTITY_TOKEN_ENDPOINT = `https://${config.CE_BASE_URL}/${config.CE_SYSTEM_WORKSPACE}/oauth2/token`;
  const body = new URLSearchParams();
  body.set('grant_type', 'client_credentials');
  body.set('scope', 'manage_openbanking_consents');
  try {
    const accessToken = await axios.post(CLOUD_ENTITY_TOKEN_ENDPOINT, body, {
      auth: {
        username: config.CE_CONSENT_CLIENT_ID || '',
        password: config.CE_CONSENT_CLIENT_SECRET || '',
      },
    });
    return accessToken.data.access_token;
  } catch (err) {
    console.log(err);
  }
}

export async function getLoginAccessToken(config: ICETokenConfig) {
  const CLOUD_ENTITY_TOKEN_ENDPOINT = `https://${config.CE_BASE_URL}/${config.CE_SYSTEM_WORKSPACE}/oauth2/token`;
  const body = new URLSearchParams();
  body.set('grant_type', 'client_credentials');
  body.set('scope', 'manage_logins');
  try {
    const accessToken = await axios.post(CLOUD_ENTITY_TOKEN_ENDPOINT, body, {
      auth: {
        username: config.CE_LOGIN_CLIENT_ID || '',
        password: config.CE_LOGIN_CLIENT_SECRET || '',
      },
    });
    return accessToken.data.access_token;
  } catch (err) {
    console.log(err);
  }
}
