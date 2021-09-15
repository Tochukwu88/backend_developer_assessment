const express = require('express')
const BlogController = require('../controllers/blog')



const router = express.Router()

router.post('/create', BlogController.createBlog)
router.put('/update/:id',BlogController.updateBlog)
router.delete('/delete/:id',BlogController.deleteBlog)

router.get('/getall', BlogController.getAllBlogs)
router.get('/get/:id', BlogController.getSingleBlog)

module.exports = router


