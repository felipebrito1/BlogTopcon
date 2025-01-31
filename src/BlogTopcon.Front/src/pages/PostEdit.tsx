// src/pages/PostEdit.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostDto } from '../types/PostDto';
import axiosInstance from '../axiosInstance';
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
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
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
    if (!post) return;

    try {
      await axiosInstance.put(`${apiUrl}/Post/${post.id}`, post);
      navigate('/post/list'); // Redireciona de volta para a tela inicial após salvar
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the post');
    }
  };

  // Função para cancelar a edição e voltar para a tela anterior
  const cancelEdit = () => {
    navigate(-1); // Retorna para a página anterior
  };

  if (!post) {
    return <h2>Carregando...</h2>;
  }

  if (error) {
    return <h2>Erro: {error}</h2>;
  }

  return (
    <div className="w-50">
      <h1>Editar Post</h1>
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
            onChange={(e) => setPost({ ...post, title: e.target.value })}
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
            onChange={(e) => setPost({ ...post, content: e.target.value })}
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
            value={post.creationDateFormat || ''}
            disabled
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
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

export default PostEdit;
