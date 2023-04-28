import Mongoose from 'mongoose';
import { config } from './config/config.js';

const url = config.db_url.url;

if (!url) {
  console.log(`url ${url}`);
  throw new Error('DATABASE_URL is not set');
}

export const connect = async () => {
  await Mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('[db] Connected');
};
