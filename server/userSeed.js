import User from "./models/user.js"
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
import connectDB from "./db/db.js"

dotenv.config();

const userRegisteration = async () => {
    connectDB();
    try {
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User ({
            name: "admin",
            email: "admin@gmail.com",
            phone: "03244695160",
            password: hashPassword,
            role: "admin"

        })
        await newUser.save();
    } catch (error) {
        console.log("Error Occured while resgistering admin", error);
        
    }
}
userRegisteration();