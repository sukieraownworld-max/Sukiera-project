const express = require('express');

const router = express.Router();

// Dashboard Analytics
router.get('/dashboard', (req, res) => {
  try {
    res.json({
      success: true,
      analytics: {
        totalUsers: 1250,
        totalProviders: 145,
        totalBookings: 3560,
        completedBookings: 3200,
        totalRevenue: 890000,
        cancellationRate: 10.11,
        averageRating: 4.5,
        activeNow: 285
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Users List
router.get('/users', (req, res) => {
  try {
    res.json({
      success: true,
      users: [
        { id: 1, name: 'Raj Kumar', phone: '9876543210', role: 'customer', rating: 4.5 },
        { id: 2, name: 'Amit Singh', phone: '9123456789', role: 'provider', rating: 4.8 },
        { id: 3, name: 'Priya Sharma', phone: '8765432109', role: 'customer', rating: 4.3 }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bookings List
router.get('/bookings', (req, res) => {
  try {
    res.json({
      success: true,
      bookings: [
        { bookingId: 'SUK-1001', customer: 'Raj Kumar', service: 'electrician', fare: 250, status: 'completed' },
        { bookingId: 'SUK-1002', customer: 'Priya Sharma', service: 'plumber', fare: 300, status: 'completed' },
        { bookingId: 'SUK-1003', customer: 'Vikram', service: 'electrician', fare: 400, status: 'completed' }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
