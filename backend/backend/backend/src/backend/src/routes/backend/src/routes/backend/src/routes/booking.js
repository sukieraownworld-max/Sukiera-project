const express = require('express');

const router = express.Router();

// Create Booking
router.post('/request', (req, res) => {
  try {
    const { serviceType, address, description } = req.body;
    
    const booking = {
      bookingId: `SUK-${Date.now()}`,
      serviceType,
      address,
      description,
      status: 'requested',
      fare: Math.floor(Math.random() * 500) + 100,
      createdAt: new Date()
    };
    
    res.status(201).json({ 
      success: true, 
      message: 'Booking created',
      booking 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Bookings
router.get('/', (req, res) => {
  try {
    res.json({ 
      success: true, 
      bookings: [
        {
          bookingId: 'SUK-1234567890',
          serviceType: 'electrician',
          address: '123 Main St',
          status: 'completed',
          fare: 250,
          createdAt: new Date()
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Booking Details
router.get('/:bookingId', (req, res) => {
  try {
    res.json({
      success: true,
      booking: {
        bookingId: req.params.bookingId,
        serviceType: 'electrician',
        address: '123 Main St',
        status: 'completed',
        fare: 250
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Booking Status
router.patch('/:bookingId/status', (req, res) => {
  try {
    const { status } = req.body;
    res.json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking: {
        bookingId: req.params.bookingId,
        status
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
