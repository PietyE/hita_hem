import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import {AccordionComponent} from "../../components/ui/AccordionComponent";
import ResultItem from "./ResultItem";
import {saveSearchResults} from "../../redux/actions/faq";
import {useDispatch} from "react-redux";

const SearchResults = ({searchResults}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [activeKey, setActiveKey] = useState(null)
    const [accordionKey, setAccordionKey] = useState(0)

    const titleRef = useRef()

    useEffect(() => {
        return () => {
            _resetSearchResults()
        }
    }, [])

    useEffect(()=>{
        setAccordionKey(accordionKey + 1)
        setActiveKey(null)
    },[searchResults])

    const _resetSearchResults = useCallback(
        () => {
            dispatch(saveSearchResults(null));
        },
        [dispatch]
    );


    return (
        <section className='search_results_section' key={accordionKey} >
            <h2 className='search_results_title' ref={titleRef}>{t("faq_page.search_results_title")}:</h2>

            {searchResults.length > 0 &&
            <AccordionComponent as='ul' className='search_results_list'>
                {searchResults.map((el, i) => (
                    <ResultItem key={el.question}
                                el={el}
                                i={i}
                                activeKey={activeKey}
                                setActiveKey={setActiveKey}
                                titleRef={titleRef}
                    />
                ))}
            </AccordionComponent>
            }

            {searchResults.length === 0 && (
                <p className='faq_no_results'>{t("faq_page.no_results")}</p>
            )}

        </section>
    );
}

export default SearchResults;