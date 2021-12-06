import express from "express";
 
import { 
    getAllToken,
    createToken,
    updateToken
} from "../controllers/Token.js";
 
const router = express.Router();
 
router.get('/', getAllToken);
router.post('/', createToken);
router.patch('/:id', updateToken);
 
export default router;