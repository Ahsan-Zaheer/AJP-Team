import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No or malformed token provided");
      return res.status(401).json({ message: "No or malformed token provided" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      
    } catch (err) {
      console.log("Token verification failed:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (!decoded?.id) {
      console.log("Invalid token payload, missing id");
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("User not found with id:", decoded.id);
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(500).json({ message: "Server error in authentication middleware" });
  }
};

export const protectRoute = async (req, res, next) => {
  try {
     const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No or malformed token provided");
      return res.status(401).json({ message: "No or malformed token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);
    

    if (token) {
    
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decodedToken);
      console.log("User ID from token:", decodedToken.id);
      
      

      const resp = await User.findById(decodedToken.id).select(
        "email role"
      );

      req.user = {
        email: resp.email,
        role: resp.role,
        userId: decodedToken.id,
      };

      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ status: false, message: "Not authorized. Try login again." });
  }
};

export const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

export default authMiddleware;
