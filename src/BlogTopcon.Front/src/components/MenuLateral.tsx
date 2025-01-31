// src/components/MenuLateral.tsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PropsToken } from '../types/PropsToken';

// Tipagem para os itens do menu
type MenuItem = 'post' | 'usuarios';

const MenuLateral: React.FC<PropsToken> = ({ setToken }) => {
  // Estado para armazenar a última opção selecionada
  const [selectedItem, setSelectedItem] = useState<MenuItem>(() => {
    // Lê do localStorage se houver, senão usa 'home' por padrão
    return (localStorage.getItem('selectedMenuItem') as MenuItem) || 'post';
  });

  // Atualiza o localStorage toda vez que o item do menu for alterado
  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    localStorage.setItem('selectedMenuItem', item); // Salva a última seleção
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="sidebar">
      <div className="d-flex flex-column p-3">
        <h3>Menu</h3>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link
                to="/post/list"
                className={`nav-link ${selectedItem === 'post' ? 'active' : ''}`}
                onClick={() => handleSelectItem('post')}
              >
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/usuario/list"
                className={`nav-link ${selectedItem === 'usuarios' ? 'active' : ''}`}
                onClick={() => handleSelectItem('usuarios')}
              >
                Usuários
              </Link>
            </li>
          </ul>
          <div>
                <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MenuLateral;
