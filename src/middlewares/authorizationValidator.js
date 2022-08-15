import authorizationSchema from "../schemas/authorizationSchema.js";

export function authorizationValidator(req, res, next) {
	const {authorization} = req.headers;
	const {error} = authorizationSchema.validate({authorization}, {abortEarly: false});
	if(error) return res.status(422).send(error.details.map(detail => detail.message));
	next();
}