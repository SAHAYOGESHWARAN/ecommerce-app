const mongoose = require('mongoose');


const connectDB = async () => {
  const maxRetries = 5;
  let retryCount = 0;

  const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true, 
        serverSelectionTimeoutMS: 5000 
      });
      console.log('✅ MongoDB Connected');
    } catch (error) {
      retryCount += 1;
      console.error(`❌ MongoDB connection failed (Attempt ${retryCount}):`, error.message);

      if (retryCount < maxRetries) {
        console.log('🔄 Retrying connection in 5 seconds...');
        setTimeout(connect, 5000); 
      } else {
        console.error('❌ Max retries reached. Exiting...');
        process.exit(1); 
      }
    }
  };

  
  await connect();
};

module.exports = connectDB;
