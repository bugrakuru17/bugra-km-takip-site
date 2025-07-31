import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini kontrol et
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const userRole = localStorage.getItem('userRole');

    console.log('AuthContext - Token:', token);
    console.log('AuthContext - Email:', email);
    console.log('AuthContext - UserRole:', userRole);

    if (token && email) {
      // Eğer email admin hesabına aitse, admin rolünü kullan
      const adminEmail = localStorage.getItem('admin_email');
      let finalRole = userRole || 'user';
      
      console.log('AuthContext - Admin email from storage:', adminEmail);
      console.log('AuthContext - Current email:', email);
      console.log('AuthContext - Email comparison:', email === adminEmail);
      
      if (email === adminEmail) {
        finalRole = 'admin';
        console.log('AuthContext - Admin email detected, setting role to admin');
      }

      const userData = {
        email,
        role: finalRole,
        token
      };
      console.log('AuthContext - Final user data set:', userData);
      setUser(userData);
    } else {
      console.log('AuthContext - No valid user data found');
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Basit login kontrolü (gerçek uygulamada API çağrısı yapılır)
    const kayıtlıEmail = localStorage.getItem('user_email');
    const kayıtlıSifre = localStorage.getItem('user_password');
    const userRole = localStorage.getItem('userRole') || 'user';
    
    // Admin hesabı kontrolü
    const adminEmail = localStorage.getItem('admin_email');
    const adminSifre = localStorage.getItem('admin_password');
    const adminRole = localStorage.getItem('admin_role');

    console.log('Login attempt:', { email, password, kayıtlıEmail, kayıtlıSifre, userRole, adminEmail, adminSifre, adminRole });

    // Önce user hesabı kontrolü
    if (email === kayıtlıEmail && password === kayıtlıSifre) {
      const token = Math.random().toString(36).substr(2, 9); // Basit token
      
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('userRole', userRole);

      const userData = {
        email,
        role: userRole,
        token
      };

      console.log('Login successful (user), user data:', userData);
      setUser(userData);

      return { success: true };
    }
    // Sonra admin hesabı kontrolü
    else if (email === adminEmail && password === adminSifre) {
      const token = Math.random().toString(36).substr(2, 9); // Basit token
      
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('userRole', adminRole);

      const userData = {
        email,
        role: adminRole,
        token
      };

      console.log('Login successful (admin), user data:', userData);
      setUser(userData);

      return { success: true };
    } else {
      console.log('Login failed');
      return { success: false, message: 'E-posta veya şifre hatalı.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userRole');
    setUser(null);
  };

  const isAdmin = () => {
    const isAdminUser = user?.role === 'admin';
    console.log('isAdmin check:', { userRole: user?.role, isAdmin: isAdminUser });
    return isAdminUser;
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    isAuthenticated,
    loading
  };

  // Loading durumunda basit görünüm
  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3>Yükleniyor...</h3>
        <p>Uygulama başlatılıyor...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
