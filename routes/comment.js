const express = require('express')
const CommentController = require('../controllers/comment')



const router = express.Router()

router.post('/add/:id', CommentController.addComment)
router.put('/edit/:blogId/:commentId',CommentController.editComment)
router.delete('/delete/:blogId/:commentId',CommentController.deleteComment)

router.get('/get/:blogId/:commentId', CommentController.getOneComment)


module.exports = router


