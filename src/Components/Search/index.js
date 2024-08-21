import React, {useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {useDispatch} from "react-redux";
import {getAllProducts, getProductByText} from "../Products/ProductDetails/action";
import {message} from "antd";

const SearchInput = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const handleSearchProduct = e => {
        setSearchText(e.target.value);
        dispatch(getAllProducts());
    };


    const handleSubmitSearch = () => {
        console.log(searchText)
        dispatch(getProductByText(searchText, message))
        //dispatch({type: GET_SEARCHED_PRODUCTS, text: searchText});
    };
    return (
        <div className='flex gap-2 my-[1rem]'>
            <Input className='input' placeholder='Search Products' onChange={handleSearchProduct}/>
            <Button onClick={handleSubmitSearch}>Search</Button>
        </div>
    );
};

export default SearchInput;
