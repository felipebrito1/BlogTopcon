// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect  } from 'react';
import MenuLateral from './components/MenuLateral';
import PostList from './pages/Post/PostList';
import PostDetail from './pages/Post/PostDetail';
import PostEdit from './pages/Post/PostEdit';
import PostCreate from './pages/Post/PostCreate';
import LoginAuth from './components/Login/LoginAuth';
import Autenticacao from './components/Autenticacao';
import LoginCreate from './components/Login/LoginCreate';
import UsuarioList from './pages/Post/Usuario/UsuarioList';

const App: React.FC = () => {
  const [token, setToken] = useState<string|null>(localStorage.getItem("authToken"));

  useEffect(() => {
    localStorage.setItem('authToken', token || "");
  }, [token]); // Executa sempre que `token` mudar

  return (
    <Router>
        <div className="d-flex">
          {/* Só exibe o MenuLateral se o token existir */}
          {token && <MenuLateral token={token} setToken={setToken} />}
          {/* Conteúdo principal */}
          <div className="w-100">
              <Routes>
                <Route path="/login" element={<LoginAuth token={token} setToken={setToken} />} />
                <Route path="/createLogin" element={<LoginCreate  />} />
                <Route path="/" element={<Autenticacao token={token} setToken={setToken}/>}>
                  <Route path="/post/list" element={<PostList />} />
                  <Route path="/post/edit/:id" element={<PostEdit />} />
                  <Route path="/post/detail/:id" element={<PostDetail />} />
                  <Route path="/post/create" element={<PostCreate />} />              
                  <Route path="/usuario/list" element={<UsuarioList />} />
                </Route>
              </Routes>
          </div>
        </div>
      </Router>
  );
}
export default App;
