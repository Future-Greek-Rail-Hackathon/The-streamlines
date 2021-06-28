import { Pool } from 'pg';

// Database connection settings
export default new Pool ({
    max: 20,
    user: 'postgres',
    host: 'localhost',
    database: 'last_mile',
    password: '1234',
    port: 5433,
    idleTimeoutMillis: 30000
});
