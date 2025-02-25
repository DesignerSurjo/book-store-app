import Coupon from "../models/couponModel.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
// নতুন কুপন তৈরি (Admin Panel)
const createCoupon = async (req, res) => {
  try {
      const { code, discountType, discountValue, minCartAmount, startDate, expiryDate, oneTimeUse } = req.body; // ✅ oneTimeUse যোগ করা হয়েছে

      if (!["percentage", "fixed"].includes(discountType)) {
          return res.status(400).json({ success: false, message: "Invalid discount type!" });
      }

      const existingCoupon = await Coupon.findOne({ code });
      if (existingCoupon) {
          return res.status(400).json({ success: false, message: "Coupon code already exists!" });
      }

      if (new Date(expiryDate) <= new Date(startDate)) {
          return res.status(400).json({ success: false, message: "Expiry date must be after the start date!" });
      }
      const newCoupon = new Coupon({ 
        code, 
        discountType, 
        discountValue, 
        minCartAmount, 
        startDate, 
        expiryDate, 
        active: true, 
        oneTimeUse: req.body.oneTimeUse || false  // ✅ Default false
    });

      await newCoupon.save();
      res.status(201).json({ success: true, message: "Coupon added successfully!" });
  } catch (error) {
      res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};


const applyCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    // Header থেকে token নেয়া
    const token = req.header('token');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized! No token provided.' });
    }

    // Token ভেরিফাই করা এবং userId বের করা
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Token থেকে userId বের করা

    const coupon = await Coupon.findOne({ code, active: true });

    if (!coupon) {
      return res.status(400).json({ success: false, message: 'Invalid or expired coupon!' });
    }

    const currentDate = new Date();
    if (currentDate < new Date(coupon.startDate)) {
      return res.status(400).json({ success: false, message: 'Coupon is not active yet!' });
    }
    if (currentDate > new Date(coupon.expiryDate)) {
      return res.status(400).json({ success: false, message: 'Coupon has expired!' });
    }

    if (cartTotal < coupon.minCartAmount) {
      return res.status(400).json({ success: false, message: `Minimum cart amount must be ${coupon.minCartAmount} to use this coupon!` });
    }

    const usedBy = coupon.usedBy || [];

    // One-time use check: If userId is already in the usedBy array, don't allow re-use
    if (coupon.oneTimeUse && usedBy.includes(userId)) {
      return res.status(400).json({ success: false, message: 'You have already used this coupon!' });
    }

    // কুপনের ডিসকাউন্ট হিসাব করা
    let discountAmount = coupon.discountType === 'percentage'
      ? (cartTotal * coupon.discountValue) / 100
      : coupon.discountValue;

    // User ID যোগ করা হচ্ছে usedBy অ্যারেতে
    usedBy.push(userId);
    coupon.usedBy = usedBy; // coupon এর usedBy তে userId যোগ করা হচ্ছে
    await coupon.save();

    res.json({
      success: true,
      discount: discountAmount,
      discountType: coupon.discountType,
      message: 'Coupon applied successfully!',
    });

  } catch (error) {
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};


  

// সমস্ত কুপন লোড করা (Admin Panel)
const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

// কুপন মুছে ফেলা (Admin Panel)
const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        await Coupon.findByIdAndDelete(id);
        res.json({ success: true, message: "Coupon deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

export { createCoupon, applyCoupon, getAllCoupons, deleteCoupon };