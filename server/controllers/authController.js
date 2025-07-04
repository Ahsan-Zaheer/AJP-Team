import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import Notice from '../models/notification.js'
import createJWT from "../utils/index.js";
import asyncHandler from "express-async-handler";

dotenv.config();

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'public/uploads');
    },filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage }).single('profileImage');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for:", email); // ✅ Check what email is received

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            console.log("No user found for email:", email); // ✅ Track missing user
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log("User found:", user.email); // ✅ Confirm user found
        console.log("Hashed password in DB:", user.password); // ✅ Show hashed password
        console.log("Password entered:", password); // ✅ Show entered password

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch); // ✅ Confirm match

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10d' });
        createJWT(res, token);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                role: user.role
            }
        });

    } catch (error) {
        console.log("Error in login controller", error);
        return res.status(500).json({ success: false, message: 'Server login error' });
    }
};



const verify = (req, res) => {

    return res.status(200).json({ success: true, user: req.user });
}


const getAllEmployees = async (req, res) => {
    try {
        
        const response = await User.find({ role: "employee" });
        if (!response || response.length === 0) {
            return res.status(404).json({ success: false, message: "No employees found" });
        }
        return res.status(200).json({ success: true, employees: response });

        
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in getAllEmployees controller" });
    }
}



const register = async (req, res) => {
    try {
        const { name, email, phone, password, department,designation, description } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const newUser = new User({
             name, 
             email,
             phone, 
             password,
             role: 'employee', 
             department, 
             designation, 
             description,
            profileImage: req.file ? req.file.filename : null
            });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '10d' });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
        
    } catch (error) {
        console.log("Error in register controller", error);
        res.status(500).json({ success: false, message: 'Server register error' });
        
    }
}


export const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        

        const employee = await User.findById({_id: id});

        return res.status(200).json({ success: true, message: "get Employee successfully", employee });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in get Employee controller" });
    }
}



export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params; // Assuming ID is passed as a route param
        const { name, email, phone, department, gender, designation, description } = req.body;

        const updateData = {
            name,
            email,
            phone,
            department,
            designation,
            gender,
            description,
        };

        if (req.file) {
            updateData.profileImage = req.file.filename;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Employee updated successfully',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                department: updatedUser.department,
                designation: updatedUser.designation,
                description: updatedUser.description,
                profileImage: updatedUser.profileImage,
                gender: updatedUser.gender
            },
          employee: updatedUser,
        });

    } catch (error) {
        console.error("Error in updateEmployee controller", error);
        res.status(500).json({ success: false, message: 'Server update error' });
    }
};

export const changePassword = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.password = newPassword;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password updated successfully'
    });
});




export const getNotificationsList = async (req, res) => {
  try {
    const { userId } = req.user;

    const notice = await Notice.find({
      team: userId,
      isRead: { $nin: [userId] },
    }).populate("task", "title");

    res.status(201).json(notice);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};


export const markNotificationRead = async (req, res) => {
  try {
    const { userId } = req.user;

    const { isReadType, id } = req.query;

    if (isReadType === "all") {
      await Notice.updateMany(
        { team: userId, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    } else {
      await Notice.findOneAndUpdate(
        { _id: id, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    }

    res.status(201).json({ status: true, message: "Done" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTeamList = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    const searchQuery = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };
    query = { ...query, ...searchQuery };
  }

  const user = await User.find(query).select("name title role email isActive");

  res.status(201).json(user);
});



export { login, verify, register, upload, getAllEmployees};