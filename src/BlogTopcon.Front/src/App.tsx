// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuLateral from './components/MenuLateral';
import PostList from './pages/PostList';
import Usuario from './pages/Usuario';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit';
import PostCreate from './pages/PostCreate';

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex">
        {/* Menu lateral */}
        <MenuLateral />
        
        {/* Conteúdo da página */}
        <div className="content p-3">
          <Routes>
            <Route path="/post/list" element={<PostList />} />
            <Route path="/usuarios" element={<Usuario />} />
            <Route path="/post/edit/:id" element={<PostEdit />} />
            <Route path="/post/detail/:id" element={<PostDetail />} />
            <Route path="/post/create" element={<PostCreate />} />            
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
