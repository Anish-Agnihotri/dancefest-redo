import NextAuth from "next-auth"; // Next Authentication
import Providers from "next-auth/providers"; // Next Authentication providers

// Database Configuration
const databaseConfig = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DBNAME,
  // Bypass SSL rejectUnauthorized (Heroku, etc)
  ssl: {
    sslmode: "require",
    rejectUnauthorized: false,
  },
};

export default NextAuth({
  // Site URL
  site: process.env.SITE || "http://localhost:3000",
  // Supported authentication providers
  providers: [
    // Email authentication
    Providers.Email({
      server: process.env.NA_EMAIL_SERVER, // SES mailserver
      from: process.env.NA_EMAIL_FROM, // From address for authentication emails
      maxAge: 24 * 60, // 1 hour max life for login request
    }),
  ],
  pages: {
    // On errors, redirect to home
    error: "/",
  },
  // Session handling
  session: {
    jwt: true, // Enable JSON Web Token
    maxAge: 30 * 24 * 60 * 60, // Expiry: 1 month
    updateAge: 0, // Update JWT on each login
  },
  jwt: {
    // JWT secret
    secret: process.env.NA_JWT_SECRET,
  },
  // Pass previously configured database config
  database: databaseConfig,
});
