import { Pool, type QueryResultRow } from "pg";
import bcrypt from "bcryptjs";

const globalForPool = global as unknown as { pgPool?: Pool };

export const pool =
  globalForPool.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : undefined,
  });

if (!globalForPool.pgPool) globalForPool.pgPool = pool;

export async function query<T extends QueryResultRow = any>(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query<T>(text, params);
    return res;
  } finally {
    client.release();
  }
}

async function ensureUsersTable(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Check if users table has any records
async function isUsersTableEmpty(): Promise<boolean> {
  try {
    const result = await query(`SELECT COUNT(*) as count FROM users`);
    return parseInt(result.rows[0].count) === 0;
  } catch {
    return true; // Table doesn't exist, treat as empty
  }
}

// Seed a dummy admin user if table is empty
async function seedDummyUserIfEmpty(): Promise<void> {
  const isEmpty = await isUsersTableEmpty();
  if (isEmpty) {
    try {
      await createUser("admin@example.com", "admin123", "admin");
      console.log("[DB] Seeded dummy admin user: admin@example.com / admin123");
    } catch (error: any) {
      // Ignore duplicate key errors (user already exists)
      if (error?.code !== "23505") {
        console.error("[DB] Failed to seed dummy user:", error?.message);
      }
    }
  }
}

// Initialize database: create table and seed dummy user if needed
// Call this on app startup
let dbInitialized = false;
export async function initializeDatabase(): Promise<void> {
  if (dbInitialized) return;

  try {
    await ensureUsersTable();
    await seedDummyUserIfEmpty();
    dbInitialized = true;
    console.log("[DB] Database initialized successfully");
  } catch (error: any) {
    console.error("[DB] Database initialization failed:", error?.message);
    throw error;
  }
}

function isTableNotExistError(error: any): boolean {
  // Check for PostgreSQL "relation does not exist" error
  if (error?.code === "42P01") return true;
  // Also check error message as fallback
  const msg = error?.message?.toLowerCase() || "";
  return msg.includes("relation") && msg.includes("does not exist");
}

interface DbUser {
  id: string;
  email: string;
  name: string | null;
  password_hash: string;
  role: string;
}

export async function createUser(email: string, password: string, role: string = "user"): Promise<DbUser | null> {
  const passwordHash = await bcrypt.hash(password, 10);
  const name = email.split("@")[0] || "User";

  try {
    const result = await query<DbUser>(
      `INSERT INTO users (email, name, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, password_hash, role`,
      [email, name, passwordHash, role]
    );
    console.log("[DB] User created:", result.rows?.[0]?.email);
    return result.rows?.[0] || null;
  } catch (error: any) {
    console.error("[DB] Create user error:", error?.message, "Code:", error?.code);
    if (isTableNotExistError(error)) {
      console.log("[DB] Table missing, creating...");
      await ensureUsersTable();
      console.log("[DB] Table created, retrying insert...");
      const result = await query<DbUser>(
        `INSERT INTO users (email, name, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, password_hash, role`,
        [email, name, passwordHash, role]
      );
      console.log("[DB] User created after table creation:", result.rows?.[0]?.email);
      return result.rows?.[0] || null;
    }

    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<DbUser | null> {
  try {
    const result = await query<DbUser>(
      `SELECT id, email, name, password_hash, role FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );
    console.log("[DB] Get user:", email, "Found:", !!result.rows?.[0]);
    return result.rows?.[0] || null;
  } catch (error: any) {
    console.error("[DB] Get user error:", error?.message, "Code:", error?.code);
    if (isTableNotExistError(error)) {
      console.log("[DB] Table missing, creating...");
      await ensureUsersTable();
      return null;
    }
    throw error;
  }
}