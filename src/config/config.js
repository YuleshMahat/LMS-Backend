import dotenv from "dotenv";

dotenv.config();
const config = {
  port: process.env.PORT || 4000,
  mongoOptions: {
    url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/lms-be",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresin: process.env.JWT_EXPIRESIN || "7d",
  },
  stripe: {
    secret: process.env.STRIPE_SECRET,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  },
};

export default config;
