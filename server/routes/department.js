import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addDepartment, getAllDepartments ,  editDepartment, getDepartment, deleteDepartment, } from '../controllers/departmentController.js';


const router = express.Router();


router.get ('/getAll', authMiddleware, getAllDepartments );

router.post ('/add', authMiddleware, addDepartment ); 

router.get ('/:id',  getDepartment ); 


router.delete ('/:id',  deleteDepartment ); 


router.put ('/:id', authMiddleware, editDepartment ); 


export default router;