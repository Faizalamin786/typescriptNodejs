import { Request, Response } from 'express';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';

// GET USER INFO
export const getUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found',
      });
    }
    user.password = undefined; // Hide password
    return res.status(200).send({
      success: true,
      message: 'User retrieved successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Get User API',
      error,
    });
  }
};

// UPDATE USER
export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();
    return res.status(200).send({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Update User API',
      error,
    });
  }
};

// UPDATE USER PASSWORD
export const updatePasswordController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: 'Please provide old and new passwords',
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: 'Invalid old password',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).send({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Password Update API',
      error,
    });
  }
};

// RESET PASSWORD
export const resetPasswordController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields',
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'User not found or invalid answer',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).send({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Password Reset API',
      error,
    });
  }
};

// DELETE PROFILE ACCOUNT
export const deleteProfileController = async (req: Request, res: Response): Promise<Response> => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: 'Your account has been deleted',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Delete Profile API',
      error,
    });
  }
};
