import React from 'react';
import { Card, Button, Row, Col, Tag, Rate, Image, Descriptions, Space, Spin, Modal } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct, useDeleteProduct } from '../hooks/useProducts';

const { confirm } = Modal;

const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error } = useProduct(id ? parseInt(id) : undefined);
  const { deleteProduct, isLoading: isDeleting } = useDeleteProduct();

  const getStockColor = (stock: number) => {
    if (stock > 50) return 'green';
    if (stock > 20) return 'orange';
    return 'red';
  };

  const getStockStatus = (stock: number) => {
    if (stock > 50) return 'In Stock';
    if (stock > 20) return 'Low Stock';
    return 'Out of Stock';
  };

  const handleDelete = () => {
    if (!product) return;

    confirm({
      title: 'Are you sure you want to delete this product?',
      icon: <ExclamationCircleOutlined />,
      content: `This will permanently delete "${product.title}" from your inventory.`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteProduct(product.id);
          navigate('/products');
        } catch (error) {
          // Error is handled in the hook
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/products')}
          className="mb-4"
        >
          Back to Products
        </Button>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/products')}
          className="mb-4"
        >
          Back to Products
        </Button>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <Space>
              <Tag color="blue">{product.category}</Tag>
              <Tag color={getStockColor(product.stock)}>
                {getStockStatus(product.stock)}
              </Tag>
            </Space>
          </div>
          
          <Space>
            <Button type="primary" icon={<EditOutlined />}>
              Edit Product
            </Button>
            <Button 
              danger 
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              loading={isDeleting}
            >
              Delete
            </Button>
          </Space>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Product Images">
            <div className="space-y-4">
              <Image
                width="100%"
                src={product.thumbnail}
                alt={product.title}
                className="rounded-lg"
              />
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <Image
                      key={index}
                      width="100%"
                      height={80}
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="rounded object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Product Details">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Price">
                <span className="text-2xl font-bold text-green-600">
                  ${product.price}
                </span>
                {product.discountPercentage > 0 && (
                  <Tag color="red" className="ml-2">
                    -{product.discountPercentage}%
                  </Tag>
                )}
              </Descriptions.Item>
              
              <Descriptions.Item label="Rating">
                <Space>
                  <Rate disabled defaultValue={product.rating} allowHalf />
                  <span>({product.rating}/5)</span>
                </Space>
              </Descriptions.Item>
              
              <Descriptions.Item label="Stock">
                <Tag color={getStockColor(product.stock)}>
                  {product.stock} units available
                </Tag>
              </Descriptions.Item>
              
              <Descriptions.Item label="Brand">
                {product.brand}
              </Descriptions.Item>
              
              <Descriptions.Item label="Category">
                <Tag color="blue">{product.category}</Tag>
              </Descriptions.Item>
              
              <Descriptions.Item label="Description">
                {product.description}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        <Col span={24}>
          <Card title="Additional Information">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{product.stock}</div>
                  <div className="text-gray-600">Units in Stock</div>
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">${product.price}</div>
                  <div className="text-gray-600">Current Price</div>
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{product.rating}</div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;