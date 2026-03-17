import React from 'react';
import { Card, Form, Input, InputNumber, Select, Upload, Button, Row, Col } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { UploadProps } from 'antd';
import { useAddProduct, useCategories } from '../hooks/useProducts';

const { TextArea } = Input;
const { Option } = Select;

const AddProductPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { addProduct, isLoading } = useAddProduct();
  const { categories } = useCategories();

  const handleSubmit = async (values: any) => {
    try {
      const productData = {
        ...values,
        images: values.images?.fileList?.map((file: any) => file.url || file.thumbUrl) || [],
      };
      
      await addProduct(productData);
      form.resetFields();
      
      // Navigate back to products page after successful submission
      setTimeout(() => {
        navigate('/products');
      }, 1500);
    } catch (error) {
      // Error is already handled in the hook
      console.error('Failed to add product:', error);
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture-card',
    beforeUpload: () => false, // Prevent auto upload
    onChange: (info) => {
      console.log('Upload info:', info);
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Add New Product</h1>
          <p className="text-gray-600">Fill in the details to add a new product to your inventory</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            stock: 0,
            rating: 0,
            discountPercentage: 0,
          }}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Product Title"
                name="title"
                rules={[
                  { required: true, message: 'Please enter product title' },
                  { min: 3, message: 'Title must be at least 3 characters' },
                ]}
              >
                <Input placeholder="Enter product title" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select placeholder="Select category" size="large">
                  {categories.map((category) => (
                    <Option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please enter product description' },
              { min: 10, message: 'Description must be at least 10 characters' },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Enter detailed product description"
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Row gutter={[24, 0]}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Price ($)"
                name="price"
                rules={[
                  { required: true, message: 'Please enter price' },
                  { type: 'number', min: 0.01, message: 'Price must be greater than 0' },
                ]}
              >
                <InputNumber
                  placeholder="0.00"
                  size="large"
                  style={{ width: '100%' }}
                  precision={2}
                  min={0}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label="Stock Quantity"
                name="stock"
                rules={[
                  { required: true, message: 'Please enter stock quantity' },
                  { type: 'number', min: 0, message: 'Stock cannot be negative' },
                ]}
              >
                <InputNumber
                  placeholder="0"
                  size="large"
                  style={{ width: '100%' }}
                  min={0}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label="Discount (%)"
                name="discountPercentage"
                rules={[
                  { type: 'number', min: 0, max: 100, message: 'Discount must be between 0-100%' },
                ]}
              >
                <InputNumber
                  placeholder="0"
                  size="large"
                  style={{ width: '100%' }}
                  min={0}
                  max={100}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: true, message: 'Please enter brand name' }]}
              >
                <Input placeholder="Enter brand name" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="SKU"
                name="sku"
                rules={[{ required: true, message: 'Please enter SKU' }]}
              >
                <Input placeholder="Enter product SKU" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Product Images" name="images">
            <Upload {...uploadProps}>
              <div className="flex flex-col items-center justify-center p-4">
                <PlusOutlined className="text-2xl mb-2" />
                <div>Upload Images</div>
              </div>
            </Upload>
            <p className="text-gray-500 text-sm mt-2">
              Upload product images (JPG, PNG, GIF up to 5MB each)
            </p>
          </Form.Item>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Button 
              size="large" 
              onClick={() => navigate('/products')}
              className="min-w-32"
            >
              Back to Products
            </Button>
            
            <div className="flex space-x-4">
              <Button size="large" onClick={() => form.resetFields()}>
                Reset
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                icon={<SaveOutlined />}
                className="min-w-32"
                loading={isLoading}
              >
                Add Product
              </Button>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddProductPage;