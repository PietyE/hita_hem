import React, {useCallback, useEffect} from 'react';
import {getFaqCategories} from "../../redux/actions/faq";
import {useDispatch, useSelector} from "react-redux";
import {getFaqCategoriesSelector} from "../../redux/reducers/faq";

const Categories = () => {
    const dispatch = useDispatch();

    const categories = useSelector(getFaqCategoriesSelector)

console.log('categories',categories)
    useEffect(()=>{
        _getCategories()
    },[])

    const _getCategories = useCallback(
        () => {
            dispatch(getFaqCategories());
        },
        [dispatch]
    );

    return (
        <div></div>
    );
}

export default Categories;