import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@sukiera.com' && password === 'Admin@123') {
      setIsLoggedIn(true);
      fetchDashboard();
    } else {
      alert('Invalid credentials');
    }
  };

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/admin/dashboard');
      setDashboard(response.data.analytics);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1E88E5' }}>🔐 Sukiera Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
            required
          />
          <button
            type="submit"
            style={{ width: '100%', padding: '12px', background: '#1E88E5', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Login
          </button>
        </form>
        <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '4px' }}>
          <p style={{ fontSize: '13px', color: '#666', margin: '5px 0' }}>Demo Credentials:</p>
          <p style={{ fontSize: '13px', color: '#333', margin: '5px 0' }}>📧 Email: <strong>admin@sukiera.com</strong></p>
          <p style={{ fontSize: '13px', color: '#333', margin: '5px 0' }}>🔑 Password: <strong>Admin@123</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#1E88E5' }}>📊 Sukiera Admin Dashboard</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{ padding: '10px 20px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          {['dashboard', 'users', 'bookings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                background: activeTab === tab ? '#1E88E5' : '#fff',
                color: activeTab === tab ? 'white' : '#666',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {activeTab === 'dashboard' && dashboard && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  {[
                    { label: 'Total Users', value: dashboard.totalUsers, color: '#1E88E5' },
                    { label: 'Total Providers', value: dashboard.totalProviders, color: '#4CAF50' },
                    { label: 'Total Bookings', value: dashboard.totalBookings, color: '#FF9800' },
                    { label: 'Completed', value: dashboard.completedBookings, color: '#8BC34A' },
                    { label: 'Revenue', value: `₹${dashboard.totalRevenue.toLocaleString()}`, color: '#E91E63' },
                    { label: 'Avg Rating', value: `${dashboard.averageRating} ⭐`, color: '#FFC107' }
                  ].map((stat, idx) => (
                    <div key={idx} style={{ padding: '20px', background: stat.color, color: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                      <p style={{ opacity: 0.9, marginBottom: '10px' }}>{stat.label}</p>
                      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '15px' }}>👥 Users</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                      <th style={{ textAlign: 'left', padding: '10px' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '10px' }}>Phone</th>
                      <th style={{ textAlign: 'left', padding: '10px' }}>Role</th>
                      <th style={{ textAlign: 'left', padding: '10px' }}>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px' }}>Raj Kumar</td>
                      <td style={{ padding: '10px' }}>9876543210</td>
                      <td style={{ padding: '10px' }}>Customer</td>
                      <td style={{ padding: '10px' }}>4.5 ⭐</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px' }}>Amit Singh</td>
                      <td style={{ padding: '10px' }}>9123456789</td>
                      <td style={{ padding: '10px' }}>Provider</td>
                      <td style={{ padding: '10px' }}>4.8 ⭐</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '15px' }}>📋 Recent Bookings</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                      <th style={{ textAlign: 'left', padding: '10px' }}>Booking ID</th>
                      <th style={{ textAlign: 'left', padding: '10px' }}>Customer</th>
                      <th style={{ textAlign: 'left', padding: '10px' }}>Service</th>
                      <th style={{ textAlign: 'left', padding: '10px' }}>Fare</th>
                      <th style={{ textAlign: 'left', padding: '10px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px' }}>SUK-1001</td>
                      <td style={{ padding: '10px' }}>Raj Kumar</td>
                      <td style={{ padding: '10px' }}>Electrician</td>
                      <td style={{ padding: '10px' }}>₹250</td>
                      <td style={{ padding: '10px' }}><span style={{ background: '#4CAF50', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>Completed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
