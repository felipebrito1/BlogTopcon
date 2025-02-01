import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { UserDto } from "../../types/UserDto";
import { Container } from "react-bootstrap";
const apiUrl = import.meta.env.VITE_API_URL;

// src/pages/Usuario.tsx
const UsuarioList: React.FC = () => {
  // Estado para armazenar os users
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os users da API
  const fetchusers = async () => {
    try {
      const response = await axiosInstance.get<UserDto[]>(`${apiUrl}/usuario`);
      setUsers(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um user
  const deleteuser = async (id: string) => {
    try {
      await axiosInstance.delete(`${apiUrl}/usuario/${id}`);
      setUsers(users.filter(user => user.id !== id)); // Remove o user da lista local
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Um erro ocorreu ao deletar o usuário');
    }
  };

  useEffect(() => {
    fetchusers();
  }, []);

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  if (error) {
    return <h2>Erro: {error}</h2>;
  }

  return (
      <Container>
        <h2 className="mb-4">Usuários</h2>
        {users.length === 0 ? (
          <p>Não existem usuários cadastrados</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Login</th>
                <th scope="col">Admin?</th>
                <th scope="col">Criado em</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.isAdminFormat}</td>
                  <td>{user.creationDateFormat}</td>
                  <td>
                    <i className="bi bi-trash text-danger" style={{ cursor: 'pointer' }} onClick={() => deleteuser(user.id!)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    );
  };
  
  export default UsuarioList;
  