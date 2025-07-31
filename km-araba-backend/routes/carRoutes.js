const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');
const Car = require('../models/Car');

// Tüm araçları getir (admin ve kullanıcı)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Yeni araç ekle (sadece admin)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { plate, brand, model, year } = req.body;
    
    const existingCar = await Car.findOne({ plate });
    if (existingCar) {
      return res.status(400).json({ message: 'Bu plaka zaten kayıtlı' });
    }

    const newCar = new Car({
      plate,
      brand,
      model,
      year,
      addedBy: req.user._id
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Araç sil (sadece admin)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Araç bulunamadı' });
    }
    res.json({ message: 'Araç başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
