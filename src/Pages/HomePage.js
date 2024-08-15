import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/Actions/ProductActions";
import { message } from "antd";
import HomeSectionDisplay from "../Components/HomeDisplay/HomeSectionDisplay";

const HomePage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => console.log(state.products));

  useEffect(() => {
    dispatch(getAllProducts(message));
  }, []);
  return (
    <div className="home-container">
      <div></div>
      <HomeSectionDisplay />
    </div>
  );
};

export default HomePage;
