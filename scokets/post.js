const Post = require('../models').Post;
module.exports = {
    async index() {
        try {
            const posts = await Post.findAll();

            return posts;
        } catch (error) {
            console.error(error);

            return [];
        }
    },
    async create(postData) {
        if(postData.title && postData.body) {
            const post = await Post.create(postData);

            return post;
        } else {
            throw new Error('Post title and body is required');
        }
    },
    async update(postData) {
        const post = await Post.findByPk(postData.id);

        if(post) {
            post.title = postData.title;
            post.body = postData.body;

            await post.save();

            return post;
        }
    },
    async destroy(postId) {
        const post = await Post.findByPk(postId);

        if(post) {
            await post.destroy();
        }
    }
};