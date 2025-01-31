// LoginAuth.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
        setSuccess("Usuario criado com sucesso.")
      }
    } catch (err) {
      debugger;
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
      {!success &&
        <>
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
        </>
       }
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {!success && 
        <>
          <button onClick={() => navigate('/login')}>Voltar</button>
          <button onClick={handleLoginRegister}>Cadastrar</button>
        </>
      }
      {success && <button onClick={() => navigate('/login')}>Ir para login</button>}
    </div>
  );
};

export default LoginAuth;
