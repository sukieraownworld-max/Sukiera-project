const express = require('express');

const router = express.Router();

const services = [
  { id: 1, name: 'Ceiling Fan Repair', category: 'electrician', basePrice: 200, icon: '⚡' },
  { id: 2, name: 'Wiring Installation', category: 'electrician', basePrice: 500, icon: '⚡' },
  { id: 3, name: 'Switchboard Repair', category: 'electrician', basePrice: 300, icon: '⚡' },
  { id: 4, name: 'Tap Leakage Fix', category: 'plumber', basePrice: 150, icon: '💧' },
  { id: 5, name: 'Pipe Fitting', category: 'plumber', basePrice: 250, icon: '💧' },
  { id: 6, name: 'Drainage Cleaning', category: 'plumber', basePrice: 400, icon: '💧' }
];

router.get('/', (req, res) => {
  res.json({ success: true, services });
});

module.exports = router;
