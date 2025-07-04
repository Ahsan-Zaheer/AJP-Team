import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import departmentRoutes from './routes/department.js'
import authRoutes from './routes/auth.js'
import taskRoutes from './routes/taskRoutes.js'
import leaveRoutes from './routes/leave.js'
import connectDB from './db/db.js'
import morgan from 'morgan'
import cookieParser from "cookie-parser";


const app = express();
app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:3000', 'http://13.60.25.116', 'https://backend.ajproductiondxb.com', 'https://portal.ajproductiondxb.com'], // Specify allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json())
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.static('public/uploads'))


app.use('/api/auth', authRoutes)
app.use('/api/department', departmentRoutes)
app.use('/api/task', taskRoutes)
app.use('/api/leave', leaveRoutes )



connectDB();

app.listen(process.env.PORT, ()=> {
    console.log(`server is running at ${process.env.PORT}`);
    
})