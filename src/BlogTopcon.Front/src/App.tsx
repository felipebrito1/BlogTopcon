import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MenuLateral from './components/MenuLateral';
import PostList from './pages/Post/PostList';
import PostDetail from './pages/Post/PostDetail';
import PostEdit from './pages/Post/PostEdit';
import PostCreate from './pages/Post/PostCreate';
import LoginAuth from './pages/Login/LoginAuth';
import Autenticacao from './components/Autenticacao';
import LoginCreate from './pages/Login/LoginCreate';
import UsuarioList from './pages/Usuario/UsuarioList';
import { jwtDecode } from 'jwt-decode';
import { Col, Container, Row } from 'react-bootstrap';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [isAdmin, setIsAdmin] = useState<string>('');
  const [nomeUser, setNomeUser] = useState<string>('');

  interface JwtPayload {
    nameidentifier: string; // ID do usuário
    [name: string]: any; // Nome do usuário
    isAdmin: string; // Flag para indicar se o usuário é admin
  }

  useEffect(() => {
    localStorage.setItem('authToken', token || '');
    if (!token) return;
    const jwtPayload = jwtDecode<JwtPayload>(token);
    if (!jwtPayload) return;
    setIsAdmin(jwtPayload.isAdmin);
    setNomeUser(jwtPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
  }, [token]);

  return (
    <Router>
      <Container fluid>
        <Row>
            {/* Só exibe o MenuLateral se o token existir */}
            {token && (
               <Col xs={2}>
                  <MenuLateral token={token} setToken={setToken} setIsAdmin={setIsAdmin} isAdmin={isAdmin} nomeUser={nomeUser} />
              </Col>
            )}
            {/* Conteúdo principal */}
            <Col>
              <Routes>
                <Route path="/login" element={<LoginAuth token={token} setToken={setToken} setIsAdmin={setIsAdmin} isAdmin={isAdmin} nomeUser={nomeUser} />} />
                <Route path="/createLogin" element={<LoginCreate />} />
                <Route path="/" element={<Autenticacao token={token} setToken={setToken} setIsAdmin={setIsAdmin} isAdmin={isAdmin} nomeUser={nomeUser} />}>
                  <Route path="/post/list" element={<PostList />} />
                  <Route path="/post/edit/:id" element={<PostEdit />} />
                  <Route path="/post/detail/:id" element={<PostDetail />} />
                  <Route path="/post/create" element={<PostCreate />} />
                  {isAdmin === 'true' && <Route path="/usuario/list" element={<UsuarioList />} />}
                </Route>
              </Routes>
            </Col>
        </Row>        
      </Container>     
    </Router>
  );
};

export default App;
