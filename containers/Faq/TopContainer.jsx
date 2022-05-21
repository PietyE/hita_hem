import React, {useCallback, useState} from 'react';
import {useTranslation} from "react-i18next";
import CloseButton from "react-bootstrap/CloseButton";
import {faqSearch} from "../../redux/actions/faq";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {getSelectedLangSelector} from "../../redux/reducers/language";
import {FAQ_ROUTE, FAQ_ROUTE_EN} from "../../constants/routesConstant";

const BackButton = dynamic(() =>
    import("./BackButton"), {ssr: false}
);


const TopContainer = ({searchResults = []}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter()
    const lang = useSelector(getSelectedLangSelector)

    const [search, setSearch] = useState('')


    const handleChangeSearch = (e) => {
        setSearch(e?.target.value)
    }

    const handleResetSearch = (e) => {
        e.preventDefault()
        setSearch('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (search) {
            if (router.pathname !== (lang === 'en' ? '/faq' : '/fragor&svar')) {
                router.push(lang === 'en' ? FAQ_ROUTE_EN : FAQ_ROUTE)
            }
            _faqSearch(search)
        }
    }

    const _faqSearch = useCallback(
        (data) => {
            dispatch(faqSearch(data));
        },
        [dispatch]
    );
    return (
        <section className='faq_top_section'>
            { (router.pathname !== '/fragor&svar' || searchResults?.length > 0) &&
            <BackButton lang={lang}/>
            }
            <h1 className='faq_top_title'>{t("faq_page.title")}</h1>
            <p className='faq_top_subtitle'>{t("faq_page.subtitle")}</p>
            <form onSubmit={handleSubmit} className='faq_search_form'>
                <input
                    type='text'
                    className='faq_search_input'
                    placeholder={t("faq_page.placeholder")}
                    value={search}
                    onChange={handleChangeSearch}
                />
                <button type='submit' className='faq_search_submit_button'></button>
                {!search &&
                <span className='faq_search_icon'>
                    <svg className="search_icon" aria-labelledby="title desc" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"><title id="title">Search
                        Icon</title>
                        <desc id="desc">A magnifying glass icon.</desc>
                        <g className="search-path" fill="none">
                            <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4"/>
                            <circle cx="8" cy="8" r="7"/>
                        </g>
                    </svg>
                </span>
                }
                {search &&
                <CloseButton aria-label="Hide" onClick={handleResetSearch}
                             className='faq_reset_button'/>
                }

            </form>
        </section>
    );
}

export default TopContainer;