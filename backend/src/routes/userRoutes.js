import express from "express";
const router = express.Router();
import { registerUser, loginUser, getMe, getAllUsers} from "../controllers/userController.js"
import { protect } from "../middleware/auth.js";

router.post('/', registerUser);
router.get('/users', getAllUsers);
router.post('/login', loginUser);
router.post('/me', protect, getMe);

export default router;