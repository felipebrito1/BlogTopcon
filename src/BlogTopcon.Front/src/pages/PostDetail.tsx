// src/pages/PostDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostDto } from '../types/PostDto';
import axios from 'axios';

const PostDetail: React.FC = () => {
    const { id } = useParams(); // Pega o id do post na URL
    const navigate = useNavigate(); // Hook para navegação
    const [post, setPost] = useState<PostDto | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    // Função para buscar os dados do post a ser editado
    const fetchPost = async (id: string) => {
      try {
        const response = await axios.get<PostDto>(`https://localhost:44356/Post/${id}`);
        setPost(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    };
  
    // Chama a função para buscar os dados do post ao montar o componente
    useEffect(() => {
      if (id) {
        fetchPost(id);
      }
    }, [id]);
  
    // Função para cancelar a edição e voltar para a tela anterior
    const cancelDetails = () => {
      navigate('/post/list'); 
    };
  
    if (!post) {
      return <h2>Loading...</h2>;
    }
  
    if (error) {
      return <h2>Error: {error}</h2>;
    }
  
    return (
      <div>
        <h1>Visualizar Post</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={post.title || ''}
              disabled
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Conteúdo
            </label>
            <textarea
              className="form-control"
              id="content"
              rows={3}
              value={post.content || ''}
              disabled
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="creationDate" className="form-label">
              Criado em
            </label>
            <input
              type="text"
              className="form-control"
              id="creationDate"
              value={post.creationDate?.toString() || ''}
              disabled
            />
          </div>
  
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={cancelDetails}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  };

export default PostDetail;
