import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import {faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import IconComponent from "../../components/ui/IconComponent";
import {saveSearchResults} from "../../redux/actions/faq";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getSelectedLangSelector} from "../../redux/reducers/language";
import {FAQ_ROUTE, FAQ_ROUTE_EN} from "../../constants/routesConstant";

const SearchResults = ({searchResults}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter()
    const [activeKey, setActiveKey] = useState(null)
    const [accordionKey, setAccordionKey] = useState(0)
    const lang = useSelector(getSelectedLangSelector)

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

    const handleClickQuestion = (e) => {
        if (e.target?.dataset?.key !== activeKey) {
            setActiveKey(e.target?.dataset?.key)
            if(titleRef?.current){
                window.scrollTo({top: titleRef?.current.offsetTop - 140,
                    // behavior: 'smooth'
                })
            }
        } else {
            setActiveKey(null)
        }
    }



    const goToCategories =(e) => {
        e.preventDefault()
        const slug = e.target.dataset.slug
        router.push(
            lang === 'en' ? `${FAQ_ROUTE_EN}/[slug]` : `${FAQ_ROUTE}/[slug]`,
            lang === 'en' ? `${FAQ_ROUTE_EN}/${slug}` : `${FAQ_ROUTE}/${slug}`,
            {scroll: false})
    }
    return (
        <section className='search_results_section' key={accordionKey}>
            <h2 className='search_results_title' ref={titleRef}>{t("faq_page.search_results_title")}:</h2>

            {searchResults.length > 0 &&
            <Accordion as='ul' className='search_results_list'>
                {searchResults.map((el, i) => (
                    <Card as='li' key={el.question} className='search_results_item'>
                        <Card.Header className='search_results_item_header'>
                            <IconComponent
                                style={Number(activeKey) === i + 1 ? {color: '#1F607C'} : {}}
                                icon={Number(activeKey) === i + 1 ? faChevronDown : faChevronRight}
                            />
                            <Accordion.Toggle
                                eventKey={i + 1}
                                onClick={handleClickQuestion}
                                data-key={i + 1}
                                style={Number(activeKey) === i + 1 ? {color: '#1F607C'} : {}}
                                className='search_results_question'
                            >
                                {el.question}
                            </Accordion.Toggle>
                            {Number(activeKey) === i + 1 &&
                            <button
                                className='faq_link_to_categories'
                                onClick={goToCategories}
                                data-slug = {el.slug}
                            >
                                <svg  width="20px" height="20px" viewBox="0 0 593.52 593.52">
	                                <path d="M500.45 15.736C490.624 5.911 477.562.5 463.667.5s-26.959 5.411-36.783 15.236L270.42 172.2c-9.826 9.825-15.236 22.888-15.236 36.784 0 13.895 5.411 26.958 15.236 36.784l23.52 23.52-24.651 24.651-23.52-23.52c-9.825-9.826-22.888-15.236-36.784-15.236-.001 0 0 0 0 0-13.895 0-26.959 5.412-36.784 15.236L15.737 426.883C5.911 436.707.501 449.77.501 463.666c0 13.895 5.411 26.959 15.236 36.783l77.333 77.334c9.826 9.824 22.889 15.236 36.784 15.236s26.958-5.412 36.783-15.236L323.1 421.318c9.826-9.824 15.236-22.889 15.236-36.783 0-13.896-5.41-26.959-15.236-36.783l-23.52-23.521 24.65-24.65 23.52 23.52c9.826 9.826 22.889 15.236 36.785 15.236 13.895 0 26.957-5.412 36.783-15.236l156.463-156.464c9.826-9.825 15.236-22.888 15.236-36.784s-5.41-26.958-15.236-36.784L500.45 15.736zM292.809 378.043c2.339 2.34 2.688 5.072 2.688 6.492s-.349 4.15-2.689 6.49L136.345 547.49c-2.339 2.338-5.07 2.688-6.49 2.688s-4.152-.348-6.491-2.689L46.03 470.156c-2.339-2.338-2.689-5.07-2.689-6.49s.349-4.152 2.689-6.49l156.464-156.465c2.339-2.34 5.071-2.689 6.491-2.689s4.151.35 6.49 2.689l23.521 23.521-42.249 42.248c-8.365 8.365-8.365 21.928 0 30.293 4.183 4.182 9.665 6.273 15.146 6.273 5.482 0 10.964-2.092 15.146-6.273l42.249-42.25 23.521 23.52zm254.682-241.699L391.026 292.808c-2.338 2.339-5.07 2.688-6.49 2.688s-4.152-.349-6.49-2.689l-23.521-23.521 44.473-44.472c8.365-8.365 8.365-21.927 0-30.292-8.365-8.365-21.928-8.365-30.293 0l-44.473 44.472-23.52-23.521c-2.34-2.339-2.689-5.07-2.689-6.49s.35-4.152 2.689-6.491L457.177 46.029c2.338-2.339 5.07-2.688 6.49-2.688s4.15.349 6.49 2.689l77.334 77.332c2.34 2.339 2.688 5.071 2.688 6.491 0 1.419-.348 4.151-2.688 6.491z" />
                                    <path d="M129.854 593.52c-14.027 0-27.216-5.463-37.137-15.383l-77.333-77.334C5.464 490.885.001 477.696.001 463.666c0-14.03 5.463-27.219 15.383-37.137l156.463-156.464c9.919-9.92 23.108-15.383 37.137-15.383s27.219 5.463 37.138 15.383l23.167 23.167 23.944-23.944-23.167-23.167c-9.92-9.919-15.383-23.108-15.383-37.137s5.463-27.218 15.383-37.137L426.53 15.383C436.449 5.463 449.638 0 463.667 0c14.027 0 27.217 5.463 37.137 15.383l77.332 77.332c9.92 9.919 15.383 23.107 15.383 37.137s-5.463 27.219-15.383 37.137L421.673 323.453c-9.922 9.92-23.11 15.383-37.137 15.383-14.029 0-27.219-5.463-37.139-15.383l-23.166-23.166-23.943 23.943 23.166 23.168c9.92 9.918 15.383 23.106 15.383 37.137s-5.463 27.219-15.383 37.137L166.991 578.137c-9.92 9.92-23.109 15.383-37.137 15.383zm79.131-337.837c-13.762 0-26.7 5.359-36.431 15.09L16.091 427.236c-9.731 9.729-15.09 22.667-15.09 36.43s5.359 26.7 15.09 36.43l77.333 77.334c9.732 9.73 22.67 15.09 36.43 15.09 13.761 0 26.698-5.359 36.43-15.09l156.463-156.465c9.73-9.729 15.09-22.667 15.09-36.43s-5.359-26.701-15.09-36.43l-23.873-23.875 25.357-25.357 23.873 23.873c9.73 9.73 22.669 15.09 36.432 15.09 13.759 0 26.697-5.359 36.43-15.09l156.463-156.464c9.73-9.73 15.09-22.668 15.09-36.43s-5.359-26.7-15.09-36.43L500.097 16.09C490.365 6.359 477.428 1 463.667 1c-13.762 0-26.7 5.359-36.43 15.09L270.773 172.554c-9.731 9.73-15.09 22.668-15.09 36.43s5.359 26.699 15.09 36.43l23.874 23.874-25.358 25.358-23.874-23.874c-9.73-9.73-22.668-15.089-36.43-15.089zm-79.131 294.995c-1.499 0-4.38-.368-6.845-2.836L45.676 470.51c-2.467-2.466-2.835-5.346-2.835-6.844s.368-4.379 2.835-6.844L202.14 300.357c2.467-2.468 5.347-2.836 6.845-2.836 1.497 0 4.377.368 6.844 2.836l23.874 23.875-42.602 42.602c-8.156 8.157-8.156 21.429 0 29.586 3.952 3.951 9.206 6.127 14.793 6.127s10.841-2.176 14.793-6.127l42.602-42.604 23.874 23.873c2.467 2.467 2.835 5.348 2.835 6.846 0 1.497-.369 4.377-2.835 6.844L136.698 547.844c-2.467 2.466-5.346 2.834-6.844 2.834zm79.131-252.157c-1.343 0-3.925.33-6.138 2.543L46.383 457.529c-2.212 2.21-2.542 4.793-2.542 6.137 0 1.343.331 3.926 2.542 6.137l77.333 77.332c2.21 2.213 4.794 2.543 6.138 2.543 1.342 0 3.924-.33 6.137-2.541l156.464-156.465c2.212-2.212 2.542-4.794 2.542-6.137s-.33-3.927-2.542-6.139l-23.167-23.166-41.895 41.896c-4.141 4.14-9.646 6.42-15.5 6.42s-11.359-2.28-15.5-6.42c-8.546-8.547-8.546-22.453 0-31l41.895-41.895-23.167-23.168c-2.212-2.211-4.794-2.542-6.136-2.542zm175.551-2.524c-1.498 0-4.379-.368-6.844-2.835l-23.875-23.874 44.826-44.825c3.951-3.951 6.128-9.205 6.128-14.792 0-5.588-2.177-10.842-6.128-14.793s-9.205-6.127-14.793-6.127-10.842 2.176-14.793 6.127l-44.826 44.826-23.873-23.874c-2.468-2.466-2.836-5.347-2.836-6.844 0-1.498.368-4.378 2.836-6.844L456.823 45.675c2.466-2.467 5.346-2.835 6.844-2.835 1.497 0 4.377.369 6.844 2.836l77.334 77.332c2.466 2.465 2.834 5.347 2.834 6.845s-.368 4.379-2.834 6.844L391.38 293.162c-2.465 2.466-5.346 2.835-6.844 2.835zm-29.305-26.71 23.168 23.167c2.21 2.212 4.793 2.542 6.137 2.542 1.343 0 3.926-.33 6.137-2.542L547.138 135.99c2.211-2.21 2.541-4.794 2.541-6.137s-.33-3.927-2.541-6.138l-77.334-77.332c-2.212-2.212-4.794-2.543-6.137-2.543s-3.926.33-6.137 2.542L301.065 202.847c-2.213 2.212-2.543 4.794-2.543 6.137s.33 3.925 2.543 6.137l23.166 23.167 44.119-44.119c4.141-4.14 9.645-6.42 15.5-6.42s11.359 2.28 15.5 6.42c8.547 8.546 8.547 22.453 0 31l-44.119 44.118z" fill="#1F607C"/>
                                </svg>
                            </button>
                            }
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