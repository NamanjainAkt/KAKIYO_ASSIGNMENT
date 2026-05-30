import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Provide a fallback for local testing without a DB connection string
const sql = neon(process.env.DATABASE_URL || 'postgresql://fake:fake@fake.neon.tech/fake');
export const db = drizzle({ client: sql, schema });
