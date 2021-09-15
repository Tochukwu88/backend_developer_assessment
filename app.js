const express = require('express');
const app = express()
const morgan = require('morgan')


const { sequelize } = require('./models/index')

const { errorResponse, successRes } = require('./utils/responseHandler');
const BlogRoutes = require('./routes/blog')
const commentRoutes = require('./routes/comment')

app.use(morgan('dev'))
require('dotenv').config()


app.use(express.json());
app.get("/", (req, res) => {
    return successRes(res, "", "welcome to my blog api",)
})
app.use('/api/blog', BlogRoutes)
app.use('/api/comment', commentRoutes)

app.use('*', (req, res) => {
    return errorResponse(res, "route not found", 404)
})


app.listen(process.env.PORT || 5000, async () => {
    try {
        console.log('server started')
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
})
module.exports = app