// Test verilerini localStorage'a ekle
export const setupTestData = () => {
  // Admin kullanıcı
  localStorage.setItem('user_email', 'admin@test.com');
  localStorage.setItem('user_password', 'admin123');
  localStorage.setItem('userRole', 'admin');
  
  // Normal kullanıcı
  localStorage.setItem('user_email_normal', 'user@test.com');
  localStorage.setItem('user_password_normal', 'user123');
  localStorage.setItem('userRole_normal', 'user');
  
  // Örnek plakalar
  const samplePlates = ['34ABC123', '06DEF456', '35GHI789'];
  localStorage.setItem('plakalar', JSON.stringify(samplePlates));
  
  // Her plaka için farklı KM geçmişi
  const plate1History = [
    {
      km: '50000',
      tarih: '2024-01-15 10:30:00',
      email: 'admin@test.com'
    },
    {
      km: '52000',
      tarih: '2024-01-20 14:15:00',
      email: 'user@test.com'
    }
  ];

  const plate2History = [
    {
      km: '75000',
      tarih: '2024-01-10 09:00:00',
      email: 'admin@test.com'
    },
    {
      km: '78000',
      tarih: '2024-01-25 16:45:00',
      email: 'user@test.com'
    }
  ];

  const plate3History = [
    {
      km: 'Yeni alındı (KM girilmedi)',
      tarih: '2024-01-30 11:20:00',
      email: 'admin@test.com'
    }
  ];
  
  // Her plaka için farklı geçmiş atama
  localStorage.setItem(`km_gecmisi_${samplePlates[0]}`, JSON.stringify(plate1History));
  localStorage.setItem(`km_gecmisi_${samplePlates[1]}`, JSON.stringify(plate2History));
  localStorage.setItem(`km_gecmisi_${samplePlates[2]}`, JSON.stringify(plate3History));
  
  console.log('✅ Test verileri başarıyla yüklendi');
  console.log('Admin: admin@test.com / admin123');
  console.log('User: user@test.com / user123');
};

// Test verilerini temizle
export const clearTestData = () => {
  localStorage.clear();
  console.log('✅ Test verileri temizlendi');
}; 