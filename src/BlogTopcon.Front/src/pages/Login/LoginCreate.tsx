import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Alert, Spinner, ButtonGroup } from 'react-bootstrap';

const apiUrl = import.meta.env.VITE_API_URL;

const LoginAuth: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();  

  const handleLoginRegister = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.post(`${apiUrl}/usuario`, { user, password });
      if (response.status === 200) {
        setSuccess("Usuário criado com sucesso.");
      }
    } catch (err) {
      setError('Credenciais inválidas');
    }
    finally {
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
          <h2 className="text-center mb-4">Criar usuário</h2>

          {/* Formulário de Cadastro */}
          {!success && 
            <Form onKeyDown={(event) => event.key === 'Enter' && handleLoginRegister()}>
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

              {/* Botões */}
              <div className="d-flex justify-content-center mt-4">
                <ButtonGroup>
                  <Button variant="secondary" onClick={() => navigate('/login')}>
                    Voltar
                  </Button>
                  <Button variant="primary" onClick={handleLoginRegister}>
                    Cadastrar
                  </Button>
                </ButtonGroup>
              </div>


            </Form>
          } 
          {/* Exibição de Erro ou Sucesso */}
          <Row className='mt-4'>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
          </Row>
          {success && 
          <Row className='mt-4'>
            <Button variant="primary" onClick={() => navigate('/login')}>
              Ir para Login
            </Button>
          </Row>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default LoginAuth;
