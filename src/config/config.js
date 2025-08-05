const config = {
  port: process.env.PORT || 4000,
  mongoOptions: {
    url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/lms-be",
  },

  jst: {
    secret: process.env.JWT_SECRET || "secret",
    expiresin: process.env.EXPIRES_IN || "7d",
  },
};

export default config;
