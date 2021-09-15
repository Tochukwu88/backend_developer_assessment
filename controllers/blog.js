const {Blog,Comment} = require('../models/index')
const { successRes, errorResponse } = require('../utils/responseHandler')

class BlogController{
    static async createBlog(req,res){
      try{
        const {title,content} = req.body
      const newBlog =   await Blog.create({title,content})
         return successRes(res,newBlog,"blog created",201)
      }catch(error){
          return errorResponse(res,error,500)
      }

    }
    static async getAllBlogs(req,res){
        try{
            const allBlogs = await Blog.findAll({ limit: 5 })
            if(allBlogs.length < 1){
                return errorResponse(res," there are no blog",404)
            }
            return successRes(res,allBlogs,"",200)
        }catch(error){
            return errorResponse(res,error,500)
        }
    }
    static async getSingleBlog(req,res){
        try{
            //gets a single post/blog as well as all the comments associated with the post/blog
            const singleBlog = await Blog.findOne({where:{id:req.params.id},include:Comment})
            if(!singleBlog){
                return errorResponse(res," blog not found",404)
            }
            return successRes(res,singleBlog,"",200)
        }catch(error){
            console.log(error)
            return errorResponse(res,error,500)
        }
    }
    
    static async updateBlog(req,res){
        try{
            const id = req.params.id
            const {title,content} = req.body
            const payload ={
                title,
                content
            }
            const singleBlog = await Blog.findOne({where:{id}})
            if(!singleBlog){
                return errorResponse(res," blog not found",404)
            }
           const updatedBlog =   await singleBlog.update(payload)
           return successRes(res,updatedBlog,"",200)
        }catch(error){
            return errorResponse(res,error,500)
        }
    }
    static async deleteBlog(req,res){
        try{
         await Blog.destroy({where:{id:req.params.id}})
         return successRes(res,"","deleted successfully",200)
        }catch(error){
            console.log(error)
            return errorResponse(res,'error please contact support',500)
        }
    }
}

module.exports = BlogController