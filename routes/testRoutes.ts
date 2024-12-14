import express, { Request, Response } from 'express';
import { testUserController } from '../controllers/testControllers';

// Create the router object
const router = express.Router();

// Define route for GET request
router.get("/test-user", (req: Request, res: Response): void => {
  testUserController(req, res);
});

// Export the router
export default router;
