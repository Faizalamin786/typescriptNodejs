import express, { Request, Response } from 'express';
import {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

// Create the router object
const router = express.Router();

// Define routes with appropriate method and controllers

// GET USER || GET
router.get("/getUser", authMiddleware, (req: Request, res: Response): void => {
  getUserController(req, res);
});

// UPDATE PROFILE || PUT
router.put("/updateUser", authMiddleware, (req: Request, res: Response): void => {
  updateUserController(req, res);
});

// UPDATE PASSWORD || POST
router.post("/updatePassword", authMiddleware, (req: Request, res: Response): void => {
  updatePasswordController(req, res);
});

// RESET PASSWORD || POST
router.post("/resetPassword", authMiddleware, (req: Request, res: Response): void => {
  resetPasswordController(req, res);
});

// DELETE USER || DELETE
router.delete("/deleteUser/:id", authMiddleware, (req: Request, res: Response): void => {
  deleteProfileController(req, res);
});

// Export the router
export default router;
