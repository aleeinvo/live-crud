const Post = require('./../models').Post;
module.exports = {
    index(req, res) {
        return res.json({
            message: 'posts are coming soon'
        })
    }
};