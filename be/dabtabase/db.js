const { Pool } = require('pg');

// PostgreSQL connection config
const pool = new Pool({
    user: 'your_pg_user',
    host: 'localhost',
    database: 'countdown_timer_bar',
    password: '',
    port: 5432,
});