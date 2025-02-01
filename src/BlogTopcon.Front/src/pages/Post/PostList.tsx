// src/pages/PostList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento
import { PostDto } from '../../types/PostDto';
import axiosInstance from '../../axiosInstance';
import { Button,ButtonGroup,Card, Container, Form } from "react-bootstrap";
const apiUrl = import.meta.env.VITE_API_URL;

class PostCreateDto implements PostDto {
  id: string | null;
  title: string | null;
  content: string | null;
  creationDateFormat: string | null;
  constructor(    
  ) {
    this.id = null;
    this.title = '';
    this.content = '';
    this.creationDateFormat = null;
  }
}

const PostList: React.FC = () => {
  // Estado para armazenar os posts
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorCreate, setErrorCreate] = useState<string | null>(null);
  const [post, setPost] = useState<PostDto>(new PostCreateDto());
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
      const response = await axiosInstance.get<PostDto[]>(`${apiUrl}/Post`);
      setPosts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado ao deletar o post');
    }
  };

  // Função para salvar o novo post
  const savePost = async () => {
    if (!post.title || !post.content) {
      setErrorCreate('Título e Conteúdo são obrigatórios.');
      return;
    }

    try {
      await axiosInstance.post(`${apiUrl}/Post`, post);
      const response = await axiosInstance.get<PostDto[]>(`${apiUrl}/Post`);
      setPosts(response.data);
      limparForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Um erro ocorou ao salvar o post');
    }
  };

  // Função para cancelar a criação e voltar para a tela anterior
  const limparForm = () => {
    setPost(new PostCreateDto());
    setErrorCreate(null);
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
      <Container>
        <h2 className="mb-4">Minhas publicações</h2>
        <Form>
          <Form.Group>
            <Form.Label>Título</Form.Label>
                    <Form.Control
                      type="text"
                      value={post.title || ''}
                      onChange={(e) => setPost({ ...post, title: e.target.value })}
                      required
                    />
            </Form.Group>
            <Form.Group>
              <Form.Label>Conteúdo</Form.Label>
              <Form.Control
                      as="textarea"
                      type="text"
                      id="content"
                      rows={3}
                      value={post.content || ''}
                      onChange={(e) => setPost({ ...post, content: e.target.value })}
                      required
                    />
            </Form.Group>
        </Form>
        {errorCreate && <div className="alert alert-danger mt-4">{errorCreate}</div>}
        <div className="d-flex justify-content-center mt-4">
          <ButtonGroup>
            <Button variant="secondary" onClick={limparForm}>
              Limpar
            </Button>
            <Button variant="primary" onClick={savePost}>
            Publicar
            </Button>
          </ButtonGroup>
        </div>

        {posts.length === 0 ? (
          <Card className="mt-4 mb-4">
            <Card.Body className='d-flex justify-content-center'>
              <p>Você ainda não possui nenhuma publicação</p>
            </Card.Body>
          </Card>
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
