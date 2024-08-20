import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { GET_SEARCHED_PRODUCTS } from "../Products/ProductDetails/constants";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearchProduct = e => {
    setSearchText(e.target.value);
    dispatch({ type: GET_SEARCHED_PRODUCTS, text: e.target.value });
  };
  const dispatch = useDispatch();

  const handleSubmitSearch = () => {
    dispatch({ type: GET_SEARCHED_PRODUCTS, text: searchText });
  };
  return (
    <div className='flex gap-2 my-[1rem]'>
      <Input className='input' placeholder='Search Products' onChange={handleSearchProduct} />
      <Button onClick={handleSubmitSearch}>Search</Button>
    </div>
  );
};

export default SearchInput;
