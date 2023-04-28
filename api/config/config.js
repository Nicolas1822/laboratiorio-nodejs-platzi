import dotenv from "dotenv";
dotenv.config();

export const config = {
  db_url: {
    url: process.env.DATABASE_URL
  },
  connectionPort: {
    port: process.env.PORT
  },
  secret: {
    jwt_secret: process.env.JWT_SECRET
  }
}
