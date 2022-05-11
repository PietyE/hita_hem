import React, {useCallback, useEffect} from 'react';
import Categories from "../containers/Faq/Categories";
import TopContainer from "../containers/Faq/TopContainer";
import {useSelector, useDispatch} from "react-redux";
import {getFaqIsFetchingSelector,getFaqCategoriesSelector, getFaqSearchResultsSelector} from "../redux/reducers/faq";
import isEqual from "lodash/isEqual";
import dynamic from "next/dynamic";
import SpinnerStyled from "../components/ui/Spinner";
import MetaTags from "../components/MetaTags";
import Schema from "../components/Schema";
import makeFaqSchema from "../Schemas/faqSchema";
import {wrapper} from "../redux/store";
import {getFaqCategories, setFaqCategories} from "../redux/actions/faq";
import {END} from "redux-saga";
const SearchResults = dynamic(() =>
    import("../containers/Faq/SearchResults"), {ssr: false}
);

const FragorSvar = () => {
    const dispatch = useDispatch();

    const searchResults = useSelector(getFaqSearchResultsSelector, isEqual)
    const isFetching = useSelector(getFaqIsFetchingSelector)
    const categories = useSelector(getFaqCategoriesSelector, isEqual)
    const seo = {
        title: '',
        description: '',
    }

    useEffect(() => {
        _getCategories()
        return () => _resetCategories()
    }, [])

    const _getCategories = useCallback(
        () => {
            dispatch(getFaqCategories());
        },
        [dispatch]
    );

    const _resetCategories = useCallback(
        () => {
            dispatch(setFaqCategories([]));
        },
        [dispatch]
    );
    return (
        <>
            {isFetching && <SpinnerStyled/>}
            <MetaTags seo={seo}/>
            <Schema makeSchema={makeFaqSchema} data={categories} keyName='q&a'/>
            <section className='faq_section'>
                <TopContainer searchResults={searchResults}/>

                {!Array.isArray(searchResults) && (
                    <Categories categories={categories}/>
                )}
                {Array.isArray(searchResults) && (
                    <SearchResults searchResults={searchResults}/>
                )}
            </section>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({req, res, params, ...etc}) => {
                store.dispatch(getFaqCategories());
                store.dispatch(END);
                await store.sagaTask.toPromise();
        }
);

export default FragorSvar;