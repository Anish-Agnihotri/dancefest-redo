import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// Database Configuration
const databaseConfig = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DBNAME,
  ssl: {
    sslmode: "require",
    rejectUnauthorized: false,
  },
};

export default NextAuth({
  site: process.env.SITE || "http://localhost:3000",
  providers: [
    Providers.Email({
      server: process.env.NA_EMAIL_SERVER,
      from: process.env.NA_EMAIL_FROM,
      maxAge: 24 * 60 * 60,
    }),
  ],
  pages: {
    error: "/",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 0,
  },
  jwt: {
    secret: process.env.NA_JWT_SECRET,
  },
  database: databaseConfig,
});
