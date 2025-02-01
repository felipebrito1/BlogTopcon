// src/pages/PostCreate.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostDto } from '../../types/PostDto';
import axiosInstance from '../../axiosInstance';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
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

const PostCreate: React.FC = () => {
  const [post, setPost] = useState<PostDto>(new PostCreateDto());

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para salvar o novo post
  const savePost = async () => {
    if (!post.title || !post.content) {
      setError('Título e Conteúdo são obrigatórios.');
      return;
    }

    try {
      await axiosInstance.post(`${apiUrl}/Post`, post);
      navigate('/post/list'); // Redireciona de volta para a tela inicial após salvar
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Um erro ocorou ao salvar o post');
    }
  };

  // Função para cancelar a criação e voltar para a tela anterior
  const limparForm = () => {
    setPost(new PostCreateDto());
    setError(null);
  };

  return (
      <>
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
        {error && <div className="alert alert-danger mt-4">{error}</div>}
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
      </>
  );
};

export default PostCreate;
