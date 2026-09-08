// app.config.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = process.env.APP_ENV ? `.env.${process.env.APP_ENV}` : '.env.development';
dotenv.config({ path: path.resolve(__dirname, envFile) });

export default {
  expo: {
    name: 'davatrack-delivery-app',
    slug: 'davatrack-delivery-app',
    version: '1.0.0',
    extra: {
      apiUrl: process.env.API_URL,
      env: process.env.ENV,
    },
  },
};