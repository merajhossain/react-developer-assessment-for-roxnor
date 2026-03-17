import React, { useState } from 'react';
import { Layout, Drawer, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingOutlined, MenuOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const navLinks = [
  { key: 'products', label: 'Products', to: '/products' },
//   { key: 'add-product', label: 'Add Product', to: '/add-product' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeKey = location.pathname.startsWith('/add-product')
    ? 'add-product'
    : 'products';

  return (
    <AntHeader className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/products" className="logo-wrap">
          <div className="logo-mark">
            <ShoppingOutlined />
          </div>
          <span className="logo-text">ProductStore</span>
        </Link>

        {/* Desktop Nav */}
        {/* <nav className="header-nav hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              className={`nav-link ${activeKey === link.key ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav> */}

        {/* Mobile hamburger — only visible on small screens */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          className="mobile-menu-btn"
          onClick={() => setDrawerOpen(true)}
        />
      </div>

      {/* Mobile Drawer */}
      {/* <Drawer
        title="Menu"
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={260}
      >
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              onClick={() => setDrawerOpen(false)}
              className={`block px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeKey === link.key
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Drawer> */}
    </AntHeader>
  );
};

export default Header;
