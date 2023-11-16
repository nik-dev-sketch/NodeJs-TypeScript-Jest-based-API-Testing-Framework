import https from 'https';

import axios from 'axios';

import { ICETokenConfig } from './CETokenConfig';

const agent = (https.globalAgent.options.rejectUnauthorized = false);

export async function getOidcDiscovery(config: ICETokenConfig, workspace: string) {
  const configUrl = `https://${config.CE_BASE_URL}/${workspace}/.well-known/openid-configuration`;
  const configResponse = await axios.get(configUrl, { httpAgent: agent });
  return configResponse.data;
}
