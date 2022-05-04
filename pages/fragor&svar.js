import React from 'react';
import Categories from "../containers/Faq/Categories";
import TopContainer from "../containers/Faq/TopContainer";
import {useSelector} from "react-redux";
import {getFaqIsFetchingSelector, getFaqSearchResultsSelector} from "../redux/reducers/faq";
import isEqual from "lodash/isEqual";
import dynamic from "next/dynamic";
import SpinnerStyled from "../components/ui/Spinner";

const SearchResults = dynamic(() =>
    import("../containers/Faq/SearchResults"), {ssr: false}
);

const FragorSvar = () => {
    const searchResults = useSelector(getFaqSearchResultsSelector, isEqual)
    const isFetching = useSelector(getFaqIsFetchingSelector)
    return (
        <>
            {isFetching && <SpinnerStyled/>}

            <section className='faq_section'>
                <TopContainer searchResults={searchResults}/>

                {!Array.isArray(searchResults) && (
                    <Categories/>
                )}
                {Array.isArray(searchResults) && (
                    <SearchResults searchResults={searchResults}/>
                )}
            </section>
        </>
    );
}

export default FragorSvar;