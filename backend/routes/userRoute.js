import express from 'express'
import { loginUser,registerUser,adminLogin,getAllUsers,deleteUser } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get("/users", getAllUsers)
userRouter.delete("/users/:userId", deleteUser)

export default userRouter;