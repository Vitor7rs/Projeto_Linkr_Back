import * as repository from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";

export async function CreatePost(req, res) {
	try{
		const {userId, link, description} = req.body;
		await repository.PostPost(userId, link, description);
		return res.status(201).send("Post posted successfully!");
	}catch(error){
		console.log(error);
		return res.status(500).send("Server Error!");
	}
}

export async function ReturnPost(req, res) {
	try{
		const {rows: posts} = await repository.GetPost();
		const postWithLinkMetadata = await Promise.all(posts.map(async (post) => {
			const {url, title, image, description} = await urlMetadata(post.link);
			return {...post, link: {url, title, image, description}};
		}));
		return res.status(200).send(postWithLinkMetadata);
	}catch(error){
		console.log(error);
		return res.status(500).send("Server Error!");
	}
}

export async function EditPost(req, res) {
	try{
		const {id} = req.params;
		const {description} = req.body;
		await repository.UpdatePost(description, id);
		return res.status(200).send("Post updated successfully!");
	}catch(error){
		console.log(error);
		return res.status(500).send("Server Error!");
	}
}

export async function DeletePost(req, res) {
	try{
		const {id} = req.params;
		await repository.DeletePost(id);
		return res.status(200).send("Post deleted successfully!");
	}catch(error){
		console.log(error);
		return res.status(500).send("Server Error!");
	}
}