import db from "../config/db.js"
import bcrypt from 'bcrypt';

async function getUserByEmail(email) {
    return db.query(`SELECT * FROM users WHERE email = $1 `, [email]);
}

async function createUser(email, password, username, pictureUrl) {
    const SALT = 10;
    const hashPassword = bcrypt.hashSync(password, SALT);
    return db.query(
        `INSERT INTO users (email, password, username, "pictureUrl") 
        VALUES ($1, $2, $3, $4)`, [email, hashPassword, username, pictureUrl]
    );
}

const authRepository = {
    getUserByEmail,
    createUser
}

export default authRepository;