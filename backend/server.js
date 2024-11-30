import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import connectDB from './db/connectDB.js'
import UserRoutes from './Routes/UserRoutes.js'
import ResumeRoutes from './Routes/ResumeRoutes.js'
const app=express()
dotenv.config()
connectDB()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/api/users',UserRoutes);
app.use('/api/resume',ResumeRoutes)
const port=process.env.PORT ||5000
app.listen(port,()=>{
    console.log(`listening to the server ${port}`);
})