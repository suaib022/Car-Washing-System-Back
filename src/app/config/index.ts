import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  aamarpay_store_id: process.env.AAMARPAY_STORE_ID,
  aamarpay_signature_key: process.env.AAMARPAY_SIGNATURE_KEY,
  aamarpay_payment_url: process.env.AAMARPAY_PAYMENT_URL,
  aamarpay_payment_confirmation_url:
    process.env.AAMARPAY_PAYMENT_CONFIRMATION_URL,
};
