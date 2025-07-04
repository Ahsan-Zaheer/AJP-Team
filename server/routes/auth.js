import express from 'express';
import { login, verify, register, upload, getAllEmployees, getEmployee, updateEmployee, getNotificationsList, markNotificationRead,  getTeamList, deleteUserProfile, changePassword } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post('/login', login);
router.post('/register', upload, authMiddleware, register);
router.get('/getAllEmployees', getAllEmployees);

router.get('/verify', authMiddleware, (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (err) {
    console.error("Error in /verify route:", err);
    res.status(500).json({ message: "Server error in verify route" });
  }
});

// router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationsList);

// router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.get("/get-team", protectRoute, isAdminRoute, getTeamList);


router.put('/change-password/:id', protectRoute, isAdminRoute, changePassword);

router.get('/:id', getEmployee);

router.put('/:id', upload, authMiddleware, updateEmployee);



//   FOR ADMIN ONLY - ADMIN ROUTES
router
  .route("/:id")
  .delete(protectRoute, isAdminRoute, deleteUserProfile);


export default router;