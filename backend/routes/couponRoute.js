import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { createCoupon, applyCoupon, getAllCoupons, deleteCoupon } from '../controllers/couponController.js';

const couponRouter = express.Router();

couponRouter.post('/create', adminAuth, createCoupon);
couponRouter.post('/apply', applyCoupon);
couponRouter.get('/coupons', getAllCoupons);
couponRouter.delete('/delete/:id', adminAuth, deleteCoupon);

export default couponRouter;
