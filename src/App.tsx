import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Admin from './pages/admin';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
