import db from "../config/db.js"

export async function PostPost(userId, link, description) {
	try {
		const query = `
			INSERT INTO posts ("userId", link, description)
			VALUES ($1, $2, $3)
		`;
		return await db.query(query, [userId, link, description]);
	} catch (error) {
		throw error;
	}
}

export async function GetPost() {
	try {
		const query = `
			SELECT
				p.id,
				p.link,
				p.description,
				u.id as "userId",
				u.username,
				u."pictureUrl"
			FROM posts "p"
			JOIN users u
			ON u.id = p."userId"
			ORDER BY id DESC
			LIMIT 20
		`;
		return await db.query(query);
	} catch (error) {
		throw error;
	}
}

export async function UpdatePost(description, id) {
	try {
		const query = `
			UPDATE posts
			SET description = $1
			WHERE id = $2
		`;
		return await db.query(query, [description, id]);
	} catch (error) {
		throw error;
	}
}

export async function DeletePost(id) {
	try {
		const query = `
			DELETE FROM posts
			WHERE id = $1
		`;
		return await db.query(query, [id]);
	} catch (error) {
		throw error;
	}
}