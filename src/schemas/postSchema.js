import joi from "joi";

const postSchema = joi.object({
	userId: joi.number().required(),
	link: joi.string().required(),
	description: joi.string().allow('').required()
});

export default postSchema;