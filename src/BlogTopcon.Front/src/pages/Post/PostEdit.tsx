// src/pages/PostEdit.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostDto } from '../../types/PostDto';
import axiosInstance from '../../axiosInstance';
import { Button, ButtonGroup, Container, Form } from 'react-bootstrap';
const apiUrl = import.meta.env.VITE_API_URL;

const PostEdit: React.FC = () => {
  const { id } = useParams(); // Pega o id do post na URL
  const navigate = useNavigate(); // Hook para navegação
  const [post, setPost] = useState<PostDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os dados do post a ser editado
  const fetchPost = async (id: string) => {
    try {
      const response = await axiosInstance.get<PostDto>(`${apiUrl}/Post/${id}`);
      setPost(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado');
    }
  };

  // Chama a função para buscar os dados do post ao montar o componente
  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  // Função para enviar os dados atualizados para a API
  const savePost = async () => {
    if (!post || !post.title || !post.content) {
      setError('Título e Conteúdo são obrigatórios.');
      return;
    }

    try {
      await axiosInstance.put(`${apiUrl}/Post/${post.id}`, post);
      navigate('/post/list'); // Redireciona de volta para a tela inicial após salvar
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Um erro ocorreu ao publicar o post');
    }
  };

  // Função para cancelar a edição e voltar para a tela anterior
  const cancelEdit = () => {
    navigate(-1); // Retorna para a página anterior
  };

  if (!post) {
    return <h2>Carregando...</h2>;
  }

  return (
    <Container fluid>
      <h2 className="mb-4">Editar Publicação</h2>
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
        <Form.Group>
          <Form.Label>Criado em</Form.Label>
          <Form.Control
                  type="text"
                  value={post.creationDateFormat || ''}
                  disabled
                />
        </Form.Group>
      </Form>
      {error && <div className="alert alert-danger mt-4">{error}</div>}
      <div className="d-flex justify-content-left mt-4">
        <ButtonGroup>
          <Button variant="secondary" onClick={cancelEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={savePost}>
            Salvar
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
};

export default PostEdit;
