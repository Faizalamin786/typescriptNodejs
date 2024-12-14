import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { 
  createFoodController, 
  getAllFoodsController, 
  getSingleFoodController, 
  getFoodByResturantController, 
  updateFoodController, 
  deleteFoodController, 
  placeOrderController, 
  orderStatusController 
} from '../controllers/foodControllers';
import adminMiddleware from '../middlewares/adminMiddleware';

const router = express.Router();

// Define types for route parameters
interface Params {
  id: string;
}

// CREATE FOOD
router.post("/create", authMiddleware, createFoodController);

// GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET SINGLE FOOD
router.get("/get/:id", (req: Request<Params>, res: Response, next: NextFunction): void => {
  getSingleFoodController(req, res, next);
});

// GET FOOD by restaurant
router.get("/getByResturant/:id", (req: Request<Params>, res: Response, next: NextFunction): void => {
  getFoodByResturantController(req, res, next);
});

// UPDATE FOOD
router.put("/update/:id", authMiddleware, (req: Request<Params>, res: Response, next: NextFunction): void => {
  updateFoodController(req, res, next);
});

// DELETE FOOD
router.delete("/delete/:id", authMiddleware, (req: Request<Params>, res: Response, next: NextFunction): void => {
  deleteFoodController(req, res, next);
});

// PLACE ORDER
router.post("/placeorder", authMiddleware, placeOrderController);

// ORDER STATUS
router.post("/orderStatus/:id", authMiddleware, adminMiddleware, (req: Request<Params>, res: Response, next: NextFunction): void => {
  orderStatusController(req, res, next);
});

export default router;
