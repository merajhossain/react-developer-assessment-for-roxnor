import React from 'react';
import { Card, Rate, Tag, Button } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  rating,
  stock,
  category,
  thumbnail,
  description,
}) => {
  const getStockColor = (stock: number) => {
    if (stock > 50) return 'green';
    if (stock > 20) return 'orange';
    return 'red';
  };

  return (
    <Card
      hoverable
      style={{ width: '100%' }}
      cover={
        <img
          alt={title}
          src={thumbnail}
          className="h-48 object-cover"
        />
      }
      actions={[
        <Button
          key="view"
          type="text"
          icon={<EyeOutlined />}
          onClick={() => console.log('View product:', id)}
        >
          View
        </Button>,
        <Button
          key="edit"
          type="text"
          icon={<EditOutlined />}
          onClick={() => console.log('Edit product:', id)}
        >
          Edit
        </Button>,
      ]}
    >
      <Meta
        title={
          <div className="flex justify-between items-start">
            <span className="truncate">{title}</span>
            <span className="text-green-600 font-bold">${price}</span>
          </div>
        }
        description={
          <div className="space-y-2">
            {description && (
              <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
            )}
            <div className="flex items-center justify-between">
              <Rate disabled defaultValue={rating} allowHalf size="small" />
              <span className="text-xs text-gray-500">({rating})</span>
            </div>
            <div className="flex justify-between items-center">
              <Tag color="blue" className="text-xs">{category}</Tag>
              <Tag color={getStockColor(stock)} className="text-xs">
                {stock} in stock
              </Tag>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default ProductCard;