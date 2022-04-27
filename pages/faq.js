import React from 'react';
import Categories from "../containers/Faq/Categories";
import TopContainer from "../containers/Faq/TopContainer";
import {useSelector} from "react-redux";
import {getFaqSearchResultsSelector} from "../redux/reducers/faq";
import isEqual from "lodash/isEqual";
import dynamic from "next/dynamic";

const SearchResults = dynamic(() =>
    import("../containers/Faq/SearchResults"), {ssr: false}
);

const Faq = () => {
    const searchResults = useSelector(getFaqSearchResultsSelector, isEqual)

    return (
        <section className='faq_section'>
            <TopContainer/>

            {!Array.isArray(searchResults) && (
                <Categories/>
            )}
            {Array.isArray(searchResults) && (
                <SearchResults searchResults={searchResults}/>
            )}
        </section>
    );
}

export default Faq;