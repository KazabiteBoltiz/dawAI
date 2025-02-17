import { Product } from '@/public/types';
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { IoPricetag } from 'react-icons/io5';
import { Badge } from './ui/badge';

const ProductCard: React.FC<Product> = (product) => {
  // Calculate the date difference in days
  const expiryDate = new Date(product.expiry_date);
  const currentDate = new Date();
  const timeDiff = expiryDate.getTime() - currentDate.getTime();
  const dateDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  // Determine the text color based on the date difference
  let textColorClass = 'text-gray-2'; // Default color

  if (dateDiff <= 20 && dateDiff > 5) {
    textColorClass = 'text-retro-6'; // Apply retro-6 color
  } else if (dateDiff <= 5) {
    textColorClass = 'text-solar-3'; // Apply solar-4 color
  }

  return (
    <Card className="bg-white-1 shadow-none border border-gray-2 w-full">
      <CardHeader>
        <CardTitle className="text-xl flex gap-2 justify-start">
          <Badge className="text-2xl">{product.item_name}</Badge>
          <IoPricetag className="w-[40px] h-max" name="pricetag" />
        </CardTitle>
        <CardDescription className="text-gray-2">
          {product.quantity}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between gap-10">
        <div>
          <p>Stock:</p>
          <p className="text-2xl font-bold">{product.stock || 0}</p>
        </div>
        <div>
          <p className="text-gray-4">Bought on {new Date(product.buy_time).toLocaleDateString()}</p>
          <p className={`text-xl ${textColorClass}`}>
            Expires on <b>{new Date(product.expiry_date).toLocaleDateString()}</b>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;