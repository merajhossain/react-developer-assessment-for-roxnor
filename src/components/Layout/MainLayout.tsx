import React from 'react';
import { Layout, Menu, Typography, Avatar, Dropdown, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingOutlined,
  PlusOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/add-product') return 'add-product';
    if (path.startsWith('/products')) return 'products';
    return 'products';
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: <Link to="/products">Products</Link>,
    },
    {
      key: 'add-product',
      icon: <PlusOutlined />,
      label: <Link to="/add-product">Add Product</Link>,
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Header
        style={{
          padding: '0 24px',
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/products" className="no-underline">
            <Title level={3} className="!mb-0 text-blue-600 flex items-center hover:text-blue-700 transition-colors">
              🛍️ <span className="ml-2">Product Store</span>
            </Title>
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center space-x-6">
          <Menu
            mode="horizontal"
            selectedKeys={[getSelectedKey()]}
            items={menuItems}
            style={{
              border: 'none',
              background: 'transparent',
              minWidth: '200px',
            }}
            className="flex-1"
          />
          
          {/* User Actions */}
          <Space size="middle" className="ml-6">
            <BellOutlined className="text-lg cursor-pointer hover:text-blue-500 transition-colors" />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                <Avatar icon={<UserOutlined />} size="small" />
                <span className="hidden md:inline">Admin</span>
              </Space>
            </Dropdown>
          </Space>
        </div>
      </Header>

      <Content
        style={{
          padding: '24px',
          background: '#f8fafc',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            minHeight: 'calc(100vh - 112px)',
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;