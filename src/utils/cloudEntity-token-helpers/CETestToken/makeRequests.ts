import https from 'https';

import got from 'got';
import { HttpsProxyAgent } from 'hpagent';

import { ICETokenConfig } from './CETokenConfig';

// We use GOT library here where we have to, as AXIOS can't correctly make requests
// Through a proxy with redirects etc.
// Really should convert the whole library to use GOT consistently.
// That can be done during the nxt big cleanup.
export async function getWithHttpsProxy(inputUrl: string, headers: any) {
  const proxySetting: string | undefined = process.env.HTTP_PROXY;
  const proxy = proxySetting ? new HttpsProxyAgent({ proxy: proxySetting }) : undefined;
  const t = await got.get(inputUrl, { agent: { http: proxy, https: proxy }, followRedirect: false, headers: headers });
  return t;
}

export async function postWithHttpsProxy(inputUrl: string, form: any, config: ICETokenConfig, searchParams: any = {}) {
  const proxySetting: string | undefined = process.env.HTTP_PROXY;
  const proxy = proxySetting
    ? new HttpsProxyAgent({
        proxy: proxySetting,
        cert: config.CE_DCR_CLIENT_CERT,
        key: config.CE_DCR_CLIENT_KEY,
        passphrase: config.CE_DCR_PASSPHRASE,
      })
    : new https.Agent({
        cert: config.CE_DCR_CLIENT_CERT,
        key: config.CE_DCR_CLIENT_KEY,
        passphrase: config.CE_DCR_PASSPHRASE,
        keepAlive: true,
      });

  const t: any = await got
    .post(inputUrl, { agent: { http: proxy, https: proxy }, followRedirect: false, form: form, searchParams })
    .json();
  return t;
}
