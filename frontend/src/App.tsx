import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Pesquisa } from './pages/Pesquisa';
import { Login } from './pages/Login';
import { Ouvidoria } from './pages/Ouvidoria';
import { Sucesso } from './pages/Sucesso';
import { Cadastro } from './pages/Cadastro'; // Novo arquivo que vamos criar

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Dashboard agora é a página inicial */}
        <Route path="/pesquisa" element={<Pesquisa />} /> {/* A pesquisa mudou de lugar */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/ouvidoria" element={<Ouvidoria />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;