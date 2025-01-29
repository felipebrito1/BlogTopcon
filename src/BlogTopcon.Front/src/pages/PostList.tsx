// src/pages/PostList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento
import { PostDto } from '../types/PostDto';

const PostList: React.FC = () => {
  // Estado para armazenar os posts
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para redirecionamento

  // Função para buscar os posts da API
  const fetchPosts = async () => {
    try {
      const response = await axios.get<PostDto[]>('https://localhost:44356/Post');
      setPosts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um post
  const deletePost = async (id: string) => {
    try {
      await axios.delete(`https://localhost:44356/Post/${id}`);
      setPosts(posts.filter(post => post.id !== id)); // Remove o post da lista local
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while deleting the post');
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
    <div>
      <button className="btn btn-primary" onClick={() => navigate('/post/create')}>
        Adicionar Post
      </button>
      {posts.length === 0 ? (
        <p>No posts available</p>
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
                <td>{post.creationDate}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => deletePost(post.id!)}>Excluir</button>
                  <button className="btn btn-warning" onClick={() => editPost(post.id!)}>Editar</button>
                  <button className="btn btn-info" onClick={() => viewPost(post.id!)}>Visualizar</button>
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
