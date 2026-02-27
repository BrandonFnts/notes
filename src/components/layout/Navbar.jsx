import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { useAuth } from '@/context/AuthContext';

const { Header } = Layout;

export const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      key: '/notes',
      label: <Link to="/notes">Notes</Link>,
    },
  ];

  return (
    <Header style={{ display: 'flex', alignItems: 'center', marginBottom: 16, padding: '0 24px' }}>
      <Link to="/" style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginRight: 24, whiteSpace: 'nowrap' }}>
        My Notes App
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ flex: 1, minWidth: 0 }}
      />
      <Button type="text" danger onClick={logout} style={{ color: '#ff4d4f' }}>
        Logout
      </Button>
    </Header>
  );
};