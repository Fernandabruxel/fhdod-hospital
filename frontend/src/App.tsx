import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Pesquisa } from './pages/Pesquisa';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Ouvidoria } from './pages/Ouvidoria';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pesquisa />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ouvidoria" element={<Ouvidoria />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 