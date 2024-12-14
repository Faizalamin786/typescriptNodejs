import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.usertype !== 'admin') {
      res.status(401).send({
        success: false,
        message: 'Only Admin Access',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Unauthorized Access',
      error,
    });
  }
};