import { Outlet } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import { Navbar } from './Navbar';

const { Content } = AntLayout;

export const Layout = () => {
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content style={{ padding: "0 24px" }}>
        <Outlet />
      </Content>
    </AntLayout>
  );
};