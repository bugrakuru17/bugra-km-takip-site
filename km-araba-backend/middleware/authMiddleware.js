const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Token doğrulama middleware'i
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Token gerekli' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Geçersiz token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Geçersiz token' });
  }
};

// Admin kontrolü middleware'i
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Kullanıcı girişi gerekli' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin yetkisi gerekli' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
};

// Kullanıcı kontrolü middleware'i
const requireUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Kullanıcı girişi gerekli' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireUser
};
