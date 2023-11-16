import crypto from 'crypto';

import { ICETokenConfig } from './CETokenConfig';

function canonicalToId(config: ICETokenConfig, adr: string, user: string, canonical: string): string {
  const encryptionPassword = config.CE_ID_ENCRYPTION_SECRET + adr + user;
  const ivDerivationSeed = config.CE_NONCE_DERIVATION_SECRET + adr + user + canonical;
  const iv = crypto.createHash('sha256').update(ivDerivationSeed).digest();
  const key = crypto.createHash('sha256').update(encryptionPassword).digest();
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const id = Buffer.concat([cipher.update(canonical), cipher.final()]);
  const authTag = cipher.getAuthTag();
  const noncedId = Buffer.concat([iv, authTag, id]);
  return noncedId.toString('base64url');
}

export async function internalToCE(config: ICETokenConfig, canonical: string): Promise<string> {
  return `ce_${canonicalToId(config, 'Cloudentity', '', canonical)}`;
}
