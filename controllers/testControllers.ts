import { Request, Response } from 'express';

const testUserController = (req: Request, res: Response): void => {
  try {
    res.status(200).send("<h1>Test user Data</h1>");
  } catch (error: unknown) {
    console.log("error In Test API", error);
  }
};

export { testUserController };