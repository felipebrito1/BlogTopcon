// src/pages/PostList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento
import { PostDto } from '../../types/PostDto';
import axiosInstance from '../../axiosInstance';
const apiUrl = import.meta.env.VITE_API_URL;

const PostList: React.FC = () => {
  // Estado para armazenar os posts
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para redirecionamento

  // Função para buscar os posts da API
  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get<PostDto[]>(`${apiUrl}/Post`);
      setPosts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um post
  const deletePost = async (id: string) => {
    try {
      await axiosInstance.delete(`${apiUrl}/Post/${id}`);
      setPosts(posts.filter(post => post.id !== id)); // Remove o post da lista local
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado ao deletar o post');
    }
  };

  // Função para navegar para a página de edição de post
  const editPost = (id: string) => {
    navigate(`/post/edit/${id}`);
  };

  // Função para navegar para a página de visualização de post
  const viewPost = (id: string) => {
    navigate(`/post/detail/${id}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  if (error) {
    return <h2>Erro: {error}</h2>;
  }

  return (
    <div className="w-75">
      <button className="btn btn-primary" onClick={() => navigate('/post/create')}>
        Criar Post
      </button>
      {posts.length === 0 ? (
        <p>Você ainda não possui nenhum post publicado</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Conteúdo</th>
              <th scope="col">Criado em</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.creationDateFormat}</td>
                <td>
                  <i className="bi bi-trash text-danger" style={{ cursor: 'pointer' }} onClick={() => deletePost(post.id!)}></i>
                  <i className="bi bi-pencil text-warning" style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => editPost(post.id!)}></i>
                  <i className="bi bi-eye text-info" style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => viewPost(post.id!)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PostList;
