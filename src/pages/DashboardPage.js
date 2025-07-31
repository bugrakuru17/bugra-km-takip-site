import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navigation from "../components/Navigation";
import { setupTestData } from "../utils/setupTestData";

function DashboardPage() {
  const [plakalar, setPlakalar] = useState([]);
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    try {
      const kayıtlıPlakalar = JSON.parse(localStorage.getItem("plakalar")) || [];
      console.log('Dashboard - Yüklenen plakalar:', kayıtlıPlakalar);
      console.log('Dashboard - User bilgisi:', user);
      console.log('Dashboard - isAdmin:', isAdmin());
      setPlakalar(kayıtlıPlakalar);
    } catch (error) {
      console.error('Dashboard - Hata:', error);
      setPlakalar([]);
    }
  }, [user, isAdmin]);

  const handleKmDuzenle = (plaka) => {
    navigate(`/km-ekle?plaka=${plaka}`);
  };

  const handleKmGecmisi = (plaka) => {
    navigate(`/km-gecmisi?plaka=${plaka}`);
  };

  const handlePlakaSil = (plaka) => {
    const yeniListe = plakalar.filter((p) => p !== plaka);
    setPlakalar(yeniListe);
    localStorage.setItem("plakalar", JSON.stringify(yeniListe));
    localStorage.removeItem(`km_${plaka}`);
    localStorage.removeItem(`km_gecmisi_${plaka}`);
  };

  const handleTestDataLoad = () => {
    setupTestData();
    window.location.reload();
  };

  const handleRefresh = () => {
    const kayıtlıPlakalar = JSON.parse(localStorage.getItem("plakalar")) || [];
    setPlakalar(kayıtlıPlakalar);
  };

  // Admin için istatistikler
  const getAdminStats = () => {
    const allKmRecords = [];
    plakalar.forEach(plaka => {
      const kmData = JSON.parse(localStorage.getItem(`km_gecmisi_${plaka}`) || "[]");
      allKmRecords.push(...kmData);
    });

    const totalRecords = allKmRecords.length;
    const uniqueUsers = [...new Set(allKmRecords.map(record => record.email))];
    const recentRecords = allKmRecords.filter(record => {
      const recordDate = new Date(record.tarih);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return recordDate > weekAgo;
    });

    return {
      totalRecords,
      uniqueUsers: uniqueUsers.length,
      recentRecords: recentRecords.length,
      totalPlates: plakalar.length
    };
  };

  // Hata durumunda basit görünüm
  if (!user) {
    return (
      <div className="text-center mt-5">
        <h3>Kullanıcı Bilgisi Bulunamadı</h3>
        <p>Lütfen giriş yapın veya hesap oluşturun.</p>
        <div className="mt-3">
          <button onClick={() => window.location.href = '/login'} className="btn btn-primary me-2">
            Giriş Yap
          </button>
          <button onClick={() => window.location.href = '/register'} className="btn btn-success me-2">
            Hesap Oluştur
          </button>
          <button onClick={handleTestDataLoad} className="btn btn-info">
            Test Verilerini Yükle
          </button>
        </div>
        <div className="mt-3">
          <small className="text-muted">
            Debug: User = {JSON.stringify(user)}
          </small>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3>Plakalar</h3>
                         <small className="text-muted">
               Hoş geldin, {user?.email} ({user?.role === 'admin' ? 'Yönetici' : 'Kullanıcı'})
               <br />
               <small className="text-muted">
                 Debug: Role={user?.role}, isAdmin={isAdmin().toString()}
               </small>
             </small>
          </div>
          <Button variant="outline-secondary" size="sm" onClick={handleRefresh}>
            🔄 Yenile
          </Button>
        </div>

        {/* Admin İstatistikleri */}
        {isAdmin() && plakalar.length > 0 && (
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">📊 Toplam Kayıt</h5>
                  <p className="card-text">{getAdminStats().totalRecords}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">👥 Kullanıcı</h5>
                  <p className="card-text">{getAdminStats().uniqueUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">🚗 Plaka</h5>
                  <p className="card-text">{getAdminStats().totalPlates}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">📅 Son 7 Gün</h5>
                  <p className="card-text">{getAdminStats().recentRecords}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {plakalar.length === 0 ? (
          <div className="text-center">
            <p>Henüz hiç plaka eklenmemiş.</p>
            <Button variant="info" onClick={handleTestDataLoad} className="m-2">
              Test Verilerini Yükle
            </Button>
          </div>
        ) : (
          <>
            {/* Kullanıcı Rehberi */}
            {!isAdmin() && (
              <div className="alert alert-info mb-3">
                <h6>💡 Nasıl Kullanılır?</h6>
                <ul className="mb-0">
                  <li><strong>KM Düzenle:</strong> Aracın güncel KM bilgisini girin</li>
                  <li><strong>KM Geçmişi:</strong> O aracın tüm KM kayıtlarını görün</li>
                  <li><strong>Yeni Aldım:</strong> Yeni araç aldıysanız KM girmeden geçebilirsiniz</li>
                </ul>
              </div>
            )}
            
            <ListGroup>
              {plakalar.map((plaka, index) => {
                const kmVerileri = JSON.parse(localStorage.getItem(`km_gecmisi_${plaka}`) || "[]");
                const sonKm = kmVerileri.slice(-1)[0];

                return (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col xs={6}>
                        <strong>{plaka}</strong>
                        <div className="text-muted small">
                          Son KM: {sonKm?.km || "Veri yok"} <br />
                          Ekleyen: {sonKm?.email || "Bilinmiyor"}
                        </div>
                      </Col>
                      <Col xs={6} className="text-end">
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleKmDuzenle(plaka)}
                        >
                          KM Düzenle
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleKmGecmisi(plaka)}
                        >
                          KM Geçmişi
                        </Button>
                        {isAdmin() && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handlePlakaSil(plaka)}
                          >
                            Sil
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </>
        )}
      </Container>
    </>
  );
}

export default DashboardPage;
