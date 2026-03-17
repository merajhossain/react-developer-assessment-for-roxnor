import React from 'react';
import { Card, Table, Button, Input, Select, Space, Tag, Rate } from 'antd';
import { SearchOutlined, EyeOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { useProductsList, useCategories } from '../hooks/useProducts';
import { formatCategoryName, formatPrice, getStockColor } from '../utils/formatters';
import type { Product } from '../store/slices/productsSlice';

const { Search } = Input;
const { Option } = Select;

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();

  // Use RTK Query hooks
  const {
    products,
    total,
    currentPage,
    pageSize,
    isLoading,
    isFetching,
    searchQuery,
    selectedCategory,
    updateSearch,
    updateCategory,
    updatePagination,
    clearFilters,
    refetch,
  } = useProductsList();

  const { categories } = useCategories();

  const handleSearch = (value: string) => {
    updateSearch(value);
  };

  const handleCategoryChange = (value: string | undefined) => {
    updateCategory(value);
  };

  const handleTableChange = (page: number, size: number) => {
    updatePagination(page, size);
  };

  const handleRefresh = () => {
    refetch();
  };

  const columns: ColumnsType<Product> = [
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Product) => (
        <Space>
          <img
            src={record.thumbnail}
            alt={text}
            className="w-12 h-12 object-cover rounded"
          />
          <span className="font-medium">{text}</span>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span className="font-semibold text-green-600">{formatPrice(price)}</span>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Space>
          <Rate disabled defaultValue={rating} allowHalf />
          <span>({rating})</span>
        </Space>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Tag color={getStockColor(stock)}>
          {stock} units
        </Tag>
      ),
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Product) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          size="small"
          onClick={() => navigate(`/products/${record.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Products</h1>
          <p className="text-gray-600">Manage your product inventory and view all products</p>
        </div>
        
        <Space wrap>
          <Search
            placeholder="Search products..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            style={{ width: 300 }}
            value={searchQuery}
            onSearch={handleSearch}
            onChange={(e) => !e.target.value && handleSearch('')}
            loading={isFetching}
          />
          <Select
            placeholder="Filter by category"
            style={{ width: 180 }}
            size="large"
            allowClear
            suffixIcon={<FilterOutlined />}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {formatCategoryName(category)}
              </Option>
            ))}
          </Select>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={isFetching}
            size="large"
          >
            Refresh
          </Button>
          {(searchQuery || selectedCategory) && (
            <Button onClick={clearFilters} size="large">
              Clear Filters
            </Button>
          )}
        </Space>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} products`,
            onChange: handleTableChange,
            onShowSizeChange: handleTableChange,
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default ProductsPage;