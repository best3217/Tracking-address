import express from "express";
 
import { 
    getAllToken,
    createToken,
    updateToken,
    deleteToken
} from "../controllers/Token.js";
 
const router = express.Router();
 
router.get('/', getAllToken);
router.post('/', createToken);
router.patch('/:id', updateToken);
router.delete('/:id', deleteToken);
 
export default router;