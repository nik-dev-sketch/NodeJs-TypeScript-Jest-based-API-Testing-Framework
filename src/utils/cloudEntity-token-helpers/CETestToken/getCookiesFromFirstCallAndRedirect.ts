import { AxiosRequestConfig } from 'axios';
import he from 'he';

import { getWithHttpsProxy } from './makeRequests';

export async function getCookiesFromFirstCallAndRedirect(
  inputurl: string,
  axiosOptions: AxiosRequestConfig,
): Promise<{
  response: any;
  cookies: string;
}> {
  let cookies = '';

  const response = await getWithHttpsProxy(inputurl, axiosOptions.headers);

  if (response?.headers['set-cookie']) {
    cookies = response?.headers['set-cookie'].reduce((acc, cookie) => {
      const cookieString = cookie.split(';')[0];
      return acc ? `${acc} ${cookieString};` : `${cookieString};`;
    }, '');
  }

  if (!response || !cookies) throw Error('No Redirects found');

  const redirectChainURI = response.body.split('"')[1];

  const redirectResponse = await getWithHttpsProxy(decodeURIComponent(he.decode(redirectChainURI)), {
    ...axiosOptions,
    headers: {
      ...axiosOptions.headers,
      cookie: cookies,
    },
  });
  return {
    response: redirectResponse,
    cookies,
  };
}
