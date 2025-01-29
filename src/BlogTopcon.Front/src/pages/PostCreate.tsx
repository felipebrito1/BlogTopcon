// src/pages/PostCreate.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PostDto } from '../types/PostDto';

const PostCreate: React.FC = () => {
  const [post, setPost] = useState<PostDto>({
    id: null,
    title: '',
    content: '',
    creationDate: null,
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para salvar o novo post
  const savePost = async () => {
    if (!post.title || !post.content) {
      setError('Título e Conteúdo são obrigatórios.');
      return;
    }

    try {
      await axios.post('https://localhost:44356/Post', post);
      navigate('/post/list'); // Redireciona de volta para a tela inicial após salvar
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the post');
    }
  };

  // Função para cancelar a criação e voltar para a tela anterior
  const cancelCreate = () => {
    navigate(-1); // Retorna para a página anterior
  };

  return (
    <div>
      <h1>Criar Post</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={post.title || ''}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            rows={3}
            value={post.content || ''}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={cancelCreate}>
            Cancelar
          </button>
          <button type="button" className="btn btn-primary" onClick={savePost}>
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
