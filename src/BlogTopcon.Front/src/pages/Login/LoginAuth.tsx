import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PropsToken } from '../../types/PropsToken';
import { Button, Form, Container, Row, Col, Alert, Spinner, ButtonGroup } from 'react-bootstrap';

const apiUrl = import.meta.env.VITE_API_URL;

const LoginAuth: React.FC<PropsToken> = ({ setToken }) => {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/auth/login`, { user, password });
      if (response.status === 200 && response.data.token) {
        setToken(response.data.token);
        navigate('/post/list');
      }
    } catch (err) {
      setError('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <h2 className="text-center mb-4">Blog Topcon</h2>
          {/* Formulário de Login */}
          <Form onKeyDown={(event) => event.key === 'Enter' && handleLogin()}>
            {/* Campo de Usuário */}
            <Form.Group>
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Digite seu usuário"
                required
              />
            </Form.Group>

            {/* Campo de Senha */}
            <Form.Group>
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </Form.Group>

            {/* Exibição de Erro */}
            {error && <Alert className='mt-4' variant="danger">{error}</Alert>}

            {/* Botões */}
            <div className="d-flex justify-content-center mt-4">
              <ButtonGroup>
                <Button variant="link" onClick={() => navigate('/createLogin')}>
                  Não tenho cadastro
                </Button>
                <Button variant="primary" onClick={handleLogin}>
                  Login
                </Button>
              </ButtonGroup>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginAuth;
