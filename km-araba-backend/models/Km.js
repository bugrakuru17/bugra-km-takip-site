const mongoose = require('mongoose');

const kmSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currentKm: {
    type: Number,
    required: true,
    min: 0
  },
  previousKm: {
    type: Number,
    required: true,
    min: 0
  },
  distance: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  },
  fuelAmount: {
    type: Number,
    min: 0
  },
  fuelCost: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Distance hesaplama middleware
kmSchema.pre('save', function(next) {
  if (this.currentKm && this.previousKm) {
    this.distance = this.currentKm - this.previousKm;
  }
  next();
});

module.exports = mongoose.model('Km', kmSchema);
