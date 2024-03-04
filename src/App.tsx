import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/HomePage/Home';
import ReservationPage from './components/pages/ReservationPage/ReservationPage';
import NonExistPage from './components/pages/NonExistPage/NonExistPage';
import AdminLogin from './components/pages/AdminLogin/AdminLogin';
import AdminMenu from './components/pages/AdminMenu/AdminMenu';
import SuccessReservation from './components/pages/SuccessReservation/SuccessReservation'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservationPage" element={<ReservationPage />} />
        <Route path="*" element={<NonExistPage />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/menu' element={<AdminMenu />} />
        <Route path='/success' element={<SuccessReservation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
