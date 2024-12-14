import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} from '../controllers/categoryControllers';

const router = express.Router();

// routes
// CREATE CAT
router.post('/create', authMiddleware, createCatController);

// GET ALL CAT
router.get('/getAll', getAllCatController);

// UPDATE CAT
router.put('/update/:id', authMiddleware, updateCatController);

// DELETE CAT
router.delete('/delete/:id', authMiddleware, deleteCatController);

export default router;