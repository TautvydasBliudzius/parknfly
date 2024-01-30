import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './comonents/pages/HomePage/Home';
import ReservationPage from './comonents/pages/ReservationPage/ReservationPage';
import NonExistPage from './comonents/pages/NonExistPage/NonExistPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservationPage" element={<ReservationPage />} />
        <Route path="*" element={<NonExistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
