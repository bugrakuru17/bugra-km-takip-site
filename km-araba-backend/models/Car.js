const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  fuelType: {
    type: String,
    enum: ['Benzin', 'Dizel', 'LPG', 'Elektrik', 'Hibrit'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
