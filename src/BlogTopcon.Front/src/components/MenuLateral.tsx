// src/components/MenuLateral.tsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Tipagem para os itens do menu
type MenuItem = 'post' | 'usuarios';

const MenuLateral = () => {
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
                to="/usuarios"
                className={`nav-link ${selectedItem === 'usuarios' ? 'active' : ''}`}
                onClick={() => handleSelectItem('usuarios')}
              >
                Usuários
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MenuLateral;
