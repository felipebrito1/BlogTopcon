// src/pages/PostList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento
import { PostDto } from '../../types/PostDto';
import axiosInstance from '../../axiosInstance';
import { Button,Card, Container } from "react-bootstrap";
import PostCreate from './PostCreate';
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
  }, [posts]);

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  if (error) {
    return <h2>Erro: {error}</h2>;
  }

  return (
      <Container>
        <h2 className="mb-4">Posts</h2>
        <PostCreate/>
        {posts.length === 0 ? (
          <p>Você ainda não possui nenhum post publicado</p>
        ) : (
              <div className='mt-4'>
                {posts.map((post) => (
                  <Card key={post.id} className="mb-4">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <h5>{post.title}</h5>
                      <small>Criado em: {post.creationDateFormat}</small>
                    </div>
                    <div className="mt-3">
                      <textarea
                        className="form-control"
                        value={post.content || ''}
                        readOnly
                        disabled
                        rows={4}
                      />
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="danger"
                        onClick={() => deletePost(post.id!)}
                        className="me-2"
                      >
                        Excluir
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => editPost(post.id!)}
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button variant="info" onClick={() => viewPost(post.id!)}>
                        Visualizar
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                ))}
              </div>
        )}
      </Container>
  );
};

export default PostList;
