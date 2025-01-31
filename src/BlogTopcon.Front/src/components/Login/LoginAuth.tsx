// LoginAuth.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PropsToken } from '../../types/PropsToken';
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
    }
    finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Digite seu usuário"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={() => navigate('/createLogin')}>Não tenho cadastro</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginAuth;
