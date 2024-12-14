import express, { Request, Response } from 'express';
import { registerController, loginController } from '../controllers/authControllers';

const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", (req: Request, res: Response) => registerController(req, res));

// LOGIN || POST
router.post("/login", (req: Request, res: Response) => loginController(req, res));

export default router;