const { Comment, Blog } = require('../models/index')
const { errorResponse, successRes } = require('../utils/responseHandler')

class CommentController {
    static async addComment(req, res) {
        const blogId = req.params.id
        const comment = req.body.comment
        try {
            const singleBlog = await Blog.findOne({ where: { id: blogId } })
            if (!singleBlog) {
                return errorResponse(res, " blog not found", 404)
            }
            const newComment = await Comment.create({ comment, blogId })
            return successRes(res, newComment)

        } catch (error) {
            return errorResponse(res, "error contact support", 500)
        }
    }
    static async getOneComment(req, res) {
        const blogId = req.params.blogId
        const id = req.params.commentId
        try {
            const singleBlog = await Blog.findOne({ where: { id: blogId } })
            if (!singleBlog) {
                return errorResponse(res, " blog not found", 404)
            }
            const singleComment = await Comment.findOne({
                where: {
                    id,
                    blogId
                }
            })
            if (!singleComment) {
                return errorResponse(res, " no comment on this post", 404)
            }
            return successRes(res, singleComment)

        } catch (error) {
            return errorResponse(res, "error contact support", 500)
        }
    }
    static async editComment(req, res) {
        const blogId = req.params.blogId
        const id = req.params.commentId
        const comment = req.body.comment
        try {
            const singleBlog = await Blog.findOne({ where: { id: blogId } })
            if (!singleBlog) {
                return errorResponse(res, " blog not found", 404)
            }
            const singleComment = await Comment.findOne({
                where: {
                    id,
                    blogId
                }
            })
            if (!singleComment) {
                return errorResponse(res, " no comment on this post", 404)
            }
            await singleComment.update({ comment })
            return successRes(res, singleComment)

        } catch (error) {
            return errorResponse(res, "error contact support", 500)
        }
    }
    static async deleteComment(req, res) {
        const blogId = req.params.blogId
        const id = req.params.commentId

        try {
            const singleBlog = await Blog.findOne({ where: { id: blogId } })
            if (!singleBlog) {
                return errorResponse(res, " blog not found", 404)
            }
            const singleComment = await Comment.findOne({
                where: {
                    id,
                    blogId
                }
            })
            if (!singleComment) {
                return errorResponse(res, " no comment on this post", 404)
            }
            await Comment.destroy({ where: { id, blogId } })
            return successRes(res, 'successfully deleted')

        } catch (error) {
            return errorResponse(res, "error contact support", 500)
        }
    }
}

module.exports = CommentController