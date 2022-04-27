import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import {faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import IconComponent from "../../components/ui/IconComponent";
import {saveSearchResults} from "../../redux/actions/faq";
import {useDispatch} from "react-redux";

const SearchResults = ({searchResults}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [activeKey, setActiveKey] = useState(null)

    useEffect(() => {
        return () => {
            _resetSearchResults()
        }
    }, [])

    const _resetSearchResults = useCallback(
        () => {
            dispatch(saveSearchResults(null));
        },
        [dispatch]
    );

    const handleClickQuestion = (e) => {
        if (e.target?.dataset?.key !== activeKey) {
            setActiveKey(e.target?.dataset?.key)
        } else {
            setActiveKey(null)
        }
    }
    return (
        <section className='search_results_section'>
            <h2 className='search_results_title'>{t("faq_page.search_results_title")}:</h2>

            {searchResults.length > 0 &&
            <Accordion as='ul' className='search_results_list'>
                {searchResults.map((el, i) => (
                    <Card as='li' key={el.question} className='search_results_item'>
                        <Card.Header className='search_results_item_header'>
                            {/*<span className="search_results_chevron">*/}
                            <IconComponent
                                icon={Number(activeKey) === i + 1 ? faChevronDown : faChevronRight}
                            />
                            {/*</span>*/}
                            <Accordion.Toggle
                                eventKey={i + 1}
                                onClick={handleClickQuestion}
                                data-key={i + 1}
                                className='search_results_question'
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtmlFromBack(el.question)
                                }}>

                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={i + 1}>
                            <Card.Body
                                className='search_results_answer'
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtmlFromBack(el.answer)
                                }}/>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
            }
            {searchResults.length === 0 && (
                <p className='faq_no_results'>{t("faq_page.no_results")}</p>

            )}

        </section>
    );
}

export default SearchResults;