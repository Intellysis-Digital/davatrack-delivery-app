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
      env: process.env.APP_ENV,
      eas: {
        projectId: "0c4b826d-1aae-49e6-93b6-d1a572dac6b1"
      }
    },
    android: {
      package: "com.intellysisdigital.davatrackdelivery"   // your chosen package name
    },
    ios: {
      bundleIdentifier: "com.intellysisdigital.davatrackdelivery"  // same string works
    }
  },
};