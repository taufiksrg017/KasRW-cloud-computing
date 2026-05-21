import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminLayout from './components/layouts/AdminLayout';
import PublicLayout from './components/layouts/PublicLayout';
import Settings from './pages/Settings';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transaksi from './pages/Transaksi';
import TambahTransaksi from './pages/TambahTransaksi';
import EditTransaksi from './pages/EditTransaksi';
import DetailTransaksi from './pages/DetailTransaksi';
import LaporanPublik from './pages/LaporanPublik';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Navigate to="/laporan-publik" replace />} />
              <Route path="/laporan-publik" element={<LaporanPublik />} />
              <Route path="/informasi" element={<div>Halaman Informasi</div>} />
            </Route>

            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute><AdminLayout title="Dashboard" showSearch={false} /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute><AdminLayout title="Data Transaksi Kas" /></ProtectedRoute>}>
              <Route path="/transaksi" element={<Transaksi />} />
            </Route>
            <Route element={<ProtectedRoute><AdminLayout title="Input Transaksi" showSearch={false} /></ProtectedRoute>}>
              <Route path="/transaksi/tambah" element={<TambahTransaksi />} />
              <Route path="/transaksi/:id" element={<DetailTransaksi />} />
              <Route path="/transaksi/:id/edit" element={<EditTransaksi />} />
            </Route>
            <Route element={<ProtectedRoute><AdminLayout title="Laporan" showSearch={false} /></ProtectedRoute>}>
              <Route path="/laporan" element={<LaporanPublik />} />
            </Route>
            <Route element={<ProtectedRoute><AdminLayout title="Settings" showSearch={false} /></ProtectedRoute>}>
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;