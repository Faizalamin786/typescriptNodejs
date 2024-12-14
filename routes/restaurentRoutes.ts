import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} from '../controllers/restaurentControllers';

const router = express.Router();

// Define types for route parameters
interface Params {
  id: string;
}

// CREATE RESTAURANT || POST
router.post("/create", authMiddleware, createResturantController);

// GET ALL RESTAURANTS || GET
router.get("/getAll", getAllResturantController);

// GET RESTAURANT BY ID || GET
router.get("/get/:id", (req: Request<Params>, res: Response, next: NextFunction): void => {
  getResturantByIdController(req, res, next);
});

// DELETE RESTAURANT || DELETE
router.delete("/delete/:id", authMiddleware, (req: Request<Params>, res: Response, next: NextFunction): void => {
  deleteResturantController(req, res, next);
});

export default router;
