import './App.css';
import {Routes, Route} from 'react-router-dom'
import Main from './comonents/pages/Main/Main';
import HowToFind from './comonents/pages/HowToFind/HowToFind';
import Reservation from './comonents/pages/Reservation/Reservation';


function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/howtofind' element={<HowToFind/>} />
        <Route path='/reservation' element={<Reservation/>} />
    </Routes>
    </>
  );
}

export default App;
