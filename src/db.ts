import mongoose from 'mongoose';

// Remove later on
export const mongoPassword = 'omerpaz'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://admin:${mongoPassword}@bookbuddiz.bvka0qc.mongodb.net/test`);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB; 