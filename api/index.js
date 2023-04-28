import 'dotenv/config';
import { app } from './app.js';
import { connect as db } from './database.js';
import { boomErrorLogin } from './middleware/boom.error.js'

db();

const PORT = process.env.PORT || 3000;

import './utils/strategies/strategy.jwt.js';
app.use(boomErrorLogin);

const server = app.listen(PORT, () =>
  console.log(`[server] Connected to port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.error(`[server] An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
