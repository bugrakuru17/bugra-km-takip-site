const express = require('express');
const router = express.Router();
const { authenticateToken, requireUser } = require('../middleware/authMiddleware');
const Km = require('../models/Km');

// KM geçmişini getir
router.get('/history/:plate', authenticateToken, requireUser, async (req, res) => {
  try {
    const kmHistory = await Km.find({ plate: req.params.plate })
      .populate('addedBy', 'email')
      .sort({ date: -1 });
    
    res.json(kmHistory);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Yeni KM kaydı ekle
router.post('/', authenticateToken, requireUser, async (req, res) => {
  try {
    const { plate, km, isNewCar } = req.body;
    
    const newKm = new Km({
      plate,
      km: isNewCar ? 'Yeni alındı (KM girilmedi)' : km,
      addedBy: req.user._id,
      date: new Date()
    });

    await newKm.save();
    res.status(201).json(newKm);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcının KM kayıtlarını getir
router.get('/user', authenticateToken, requireUser, async (req, res) => {
  try {
    const userKms = await Km.find({ addedBy: req.user._id })
      .populate('addedBy', 'email')
      .sort({ date: -1 });
    
    res.json(userKms);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
