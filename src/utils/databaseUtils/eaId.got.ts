import got from 'got';

import { dataRestConfig } from './dataRestConfig';

export async function eaIDGen(accountId: string[], partyId: string[]) {
  const query: string[] = [];
  const eaIds: string[] = [];

  let options = {
    headers: {
      APIKEY: dataRestConfig.APIKEY,
      'Content-Type': 'application/json',
    },
    json: {},
    https: {
      rejectUnauthorized: false,
    },
  };

  for (let i = 0; i < accountId.length; i++) {
    query.push(`g.V('account_${accountId[i]}').bothE('HOLDS_ACCOUNT').outV().has(id,'party_${partyId[i]}').in()`);
    options = {
      ...options,
      json: {
        query: query[i],
      },
    };
    const resp = await got.post(
      `https://${dataRestConfig.host}/${dataRestConfig.environment}/${dataRestConfig.services}/${dataRestConfig.endpoint}/${dataRestConfig.query}`,
      options,
    );
    const respBody = JSON.parse(resp.body);
    const node = respBody.success.nodes;
    eaIds.push(getEAIDS(node));
  }
  return eaIds;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEAIDS(node: any) {
  for (let k = 0; k < node.length; k++) {
    for (let l = 0; l < node[k].properties.length; l++) {
      if (node[k].properties[l]?.label === 'ea_id') {
        return node[k].properties[l].value;
      }
    }
  }
}
