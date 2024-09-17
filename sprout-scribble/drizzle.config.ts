

import * as dotenv from 'dotenv';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

dotenv.config({
  path: '.env.local',
});

// export default Config({
//   schema: './server/schema.ts',
//   out: '.server/migrations',
//   dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
//   dbCredentials: {
//     connectionString: process.env.POSTGRES_URL,
//   },
// }) satisfies Config;

export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./server/schema.ts",
  out: "./server/migrations",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
});
