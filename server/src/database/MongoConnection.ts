import mongoose, { MongooseError } from 'mongoose';

const MONGO_URL = process.env.MONGO_DB_URL || '';

async function MongoConnection() {
  await mongoose
    .connect(MONGO_URL)
    .then((success) => {
      console.log(`[Mongo]: Mongo Connected ${success.connection.host}`);
    })
    .catch((error: MongooseError) => {
      console.log(`[Mongo]: Mongo connection failed ${error.message}`);
    });
}

export default MongoConnection;
