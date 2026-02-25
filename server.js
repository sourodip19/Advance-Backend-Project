import app from './src/app.js';
import dotenv from 'dotenv';
import connectDb from './src/config/connectDb.js';
dotenv.config();
connectDb().then(() =>
  app.listen(3000, () =>
    console.log('Server is up and running at port 3000 🚀'),
  ),
);
