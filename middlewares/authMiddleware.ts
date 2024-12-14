import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token: string = req.headers["authorization"]?.split(" ")[1] || '';
    JWT.verify(token, process.env.JWT_SECRET as string, (err: Error | null, decode: { id: string } | undefined) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorize User",
        });
      } else {
        req.body.id = decode?.id;
        next();
      }
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Please provide Auth Token",
      error,
    });
  }
};