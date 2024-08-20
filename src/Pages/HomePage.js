import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getProduct } from '../Redux/Actions/ProductActions';
import { message } from 'antd';
import HomeSectionDisplay from '../Components/HomeDisplay/HomeSectionDisplay';
import { getCart } from '../Redux/Actions/cartActions';
import SearchInput from '../Components/Search';

const HomePage = () => {
  const dispatch = useDispatch();

  return (
    <div className='max-w-[1200px] m-auto'>
      <SearchInput />
      <div></div>
      <HomeSectionDisplay />
    </div>
  );
};

export default HomePage;
