import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addLeave, getLeave, updateLeave, getAllLeaves, deleteLeave, permanentDeleteLeave, restoreLeave} from '../controllers/leaveController.js';


const router = express.Router();


router.post ('/add', authMiddleware, addLeave );
router.get ('/getAll', authMiddleware, getAllLeaves );

router.put('/delete/:id', deleteLeave);
router.delete('/permanent-delete/:id', permanentDeleteLeave );
router.put('/restore/:id', restoreLeave );

router.get ('/:id',  getLeave );
router.put('/:id', updateLeave);







export default router;