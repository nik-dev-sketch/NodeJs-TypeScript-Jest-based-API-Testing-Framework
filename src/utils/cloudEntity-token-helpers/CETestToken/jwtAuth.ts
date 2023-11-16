import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

import { ICETokenConfig } from './CETokenConfig';

export function getJwtAuth(config: ICETokenConfig, claims: any) {
  const state = v4();
  const nonce = v4();
  const nbf = Math.floor(new Date().getTime() / 1000) - 1;
  const exp = new Date().getTime() / 1000 + 300;
  const client_id = config.CE_DCR_CLIENT_ID;
  const aud = `https://${config.CE_BASE_URL}/${config.CE_CDR_WORKSPACE}/oauth2/token`;

  const authorisationRequestClaims = {
    state,
    nonce,
    nbf,
    exp,
    client_id,
    iss: client_id,
    sub: client_id,
    jti: v4(),
    aud,
    ...claims,
  };

  return jwt.sign(authorisationRequestClaims, config.CE_SIGNING_KEY || '', {
    algorithm: 'PS256',
  });
}
