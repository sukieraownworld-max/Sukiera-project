const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const otpStore = {};

// Send OTP
router.post('/send-otp', (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone || phone.length !== 10) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid phone number' 
      });
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[phone] = otp;
    
    console.log(`📱 OTP for ${phone}: ${otp}`);
    
    res.json({ 
      success: true, 
      message: 'OTP sent successfully',
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    if (!phone || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone and OTP required' 
      });
    }
    
    if (otpStore[phone] !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP' 
      });
    }
    
    delete otpStore[phone];
    
    const token = jwt.sign(
      { phone, role: 'customer' },
      process.env.JWT_SECRET || 'test_secret',
      { expiresIn: '30d' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        phone,
        role: 'customer'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
