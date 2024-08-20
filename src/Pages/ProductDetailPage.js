import React, { useEffect, useState } from 'react';
import ProductDetails from '../Components/Products/ProductDetails';
import io from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return <ProductDetails />;
};

export default ProductDetailPage;
