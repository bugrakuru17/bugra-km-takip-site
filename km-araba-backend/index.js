const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const kmRoutes = require("./routes/kmRoutes");
const adminRoutes = require("./routes/adminRoutes"); // 🔹 Yeni eklendi

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Veritabanı bağlantısı
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

// Ana endpoint
app.get("/", (req, res) => {
  res.send("🚗 KM Araba Takip Sistemi Backend çalışıyor!");
});

// API Rotaları
app.use("/api/users", userRoutes);   // Giriş, kayıt
app.use("/api/cars", carRoutes);     // Araç ekleme (admin)
app.use("/api/km", kmRoutes);        // KM girişleri (kullanıcı)
app.use("/api/admin", adminRoutes);  // Admin paneli (adminOnly)

// Hataları yakala
app.use((err, req, res, next) => {
  console.error("❗ Hata:", err.stack);
  res.status(500).json({ message: "Sunucu hatası" });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});
