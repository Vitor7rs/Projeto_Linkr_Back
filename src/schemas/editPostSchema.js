import joi from "joi";

const editPostSchema = joi.object({
	description: joi.string().allow('').required()
});

export default editPostSchema;