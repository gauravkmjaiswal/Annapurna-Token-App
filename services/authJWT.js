require("dotenv").config();
const JWT = require("jsonwebtoken");
const secret = process.env.SECRET;

function createTokenForUser(user) {
	const payload = {
		id: user.id,
	};
	const token = JWT.sign(payload, secret);
	return token;
}

function validateToken(token) {
	const payload = JWT.verify(token, secret);
	return payload;
}

module.exports = { createTokenForUser, validateToken };
