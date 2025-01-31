import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { UserDto } from "../../../types/UserDto";
const apiUrl = import.meta.env.VITE_API_URL;

// src/pages/Usuario.tsx
const UsuarioList: React.FC = () => {
  // Estado para armazenar os users
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para redirecionamento

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
      await axiosInstance.delete(`${apiUrl}/user/${id}`);
      setUsers(users.filter(user => user.id !== id)); // Remove o user da lista local
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Um erro ocorreu ao deletar o usuário');
    }
  };

  // Função para navegar para a página de edição de user
  const edituser = (id: string) => {
    navigate(`/user/edit/${id}`);
  };

  // Função para navegar para a página de visualização de user
  const viewuser = (id: string) => {
    navigate(`/user/detail/${id}`);
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
    <div className="w-75">
      <button className="btn btn-primary" onClick={() => navigate('/user/create')}>
        Criar Usuário
      </button>
      {users.length === 0 ? (
        <p>Não existem usuários cadastrados</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Login</th>
              <th scope="col">Criado em</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.creationDateFormat}</td>
                <td>
                  <i className="bi bi-trash text-danger" style={{ cursor: 'pointer' }} onClick={() => deleteuser(user.id!)}></i>
                  <i className="bi bi-pencil text-warning" style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => edituser(user.id!)}></i>
                  <i className="bi bi-eye text-info" style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => viewuser(user.id!)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  };
  
  export default UsuarioList;
  