import mysql from "mysql2/promise";
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the project root .env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env'), quiet: true });

// Environment variables
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

async function waitForMySQL() {
    const maxRetries = 20;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const connection = await mysql.createConnection({ host, user, password });
            await connection.ping();
            await connection.end();

            console.log("MySQL is ready.");
            return;
        } catch (err) {
            retries++;
            console.log(`MySQL not ready, retrying (${retries}/${maxRetries})...`);
            await new Promise(res => setTimeout(res, 2000)); // 2 seconds
        }
    }

    throw new Error("MySQL failed to start after multiple retries.");
}

const makeDb = async () => {
    const connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();
    console.log(`Database ${database} ready.`);
};

await waitForMySQL();
await makeDb();

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql',
    logging: false,
});

try {
    await sequelize.authenticate();
    console.log("Sequelize connected successfully.");
} catch (error) {
    console.error('Unable to connect:', error);
}

export default sequelize;