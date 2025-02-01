import { PropsToken } from '../types/PropsToken';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MenuLateral: React.FC<PropsToken> = ({ setToken, isAdmin, nomeUser }) => {
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light p-3 border-end">
        <h3>Menu</h3>
        <Nav className="flex-column">
          <Nav.Link as={NavLink} to="/post/list">
            📝 Posts
          </Nav.Link>
          {isAdmin == "true" &&
            <Nav.Link as={NavLink} to="/usuario/list">
              👥 Usuários
            </Nav.Link>
          }
          <Nav.Link onClick={handleLogout}>🚪 Sair ({nomeUser})</Nav.Link>
        </Nav>
    </div> 
  );
};

export default MenuLateral;
