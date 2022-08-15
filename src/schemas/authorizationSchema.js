import joi from "joi";

const authorizationSchema = joi.object({
	authorization: joi.string().pattern(/^Bearer .*/).required()
});

export default authorizationSchema;