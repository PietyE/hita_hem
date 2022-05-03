import React from 'react';
import Categories from "../containers/Faq/Categories";
import TopContainer from "../containers/Faq/TopContainer";
import {useSelector} from "react-redux";
import {getFaqCategoriesSelector, getFaqSearchResultsSelector} from "../redux/reducers/faq";
import isEqual from "lodash/isEqual";
import dynamic from "next/dynamic";
import MetaTags from "../components/MetaTags";
import Schema from "../components/Schema";
import makeFaqSchema from "../Schemas/faqSchema";

const SearchResults = dynamic(() =>
    import("../containers/Faq/SearchResults"), {ssr: false}
);

const FragorSvar = () => {
    const searchResults = useSelector(getFaqSearchResultsSelector, isEqual)
    const categories = useSelector(getFaqCategoriesSelector, isEqual)
    const seo = {
        title: '',
        description: '',
    }

    return (
        <>
            <MetaTags seo={seo}/>
            <Schema makeSchema={makeFaqSchema} data={categories}/>

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

export default FragorSvar;