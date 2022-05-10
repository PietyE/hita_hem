import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import CloseButton from 'react-bootstrap/CloseButton'
import {cleanSearchedCampaigns, setCampaignOffset, setCampaignSearchQuery} from "redux/actions/companies";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getSelectedLangSelector} from "../../redux/reducers/language";
import {getCampaignSearchQuerySelector} from "../../redux/reducers/companies";
import {SEARCH_ROUTE, SEARCH_ROUTE_EN} from "../../constants/routesConstant";
import {useMediaQueries} from "@react-hook/media-query";

const Search = ({
                    formClassName,
                    inputWrapperClassName,
                    inputClassName,
                    openButtonClass,
                    closeButtonClass,
                    alwaysShow,
                    placeholder,
                    closeNavMenu,
                }) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const asPath = router?.asPath
    const lang = useSelector(getSelectedLangSelector)
    const campaignSearchQuery = useSelector(getCampaignSearchQuerySelector)
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState('')


    useEffect(() => {
        setVisible(false)
        setSearch('')
    }, [asPath])

    useEffect(() => {
        if (visible) {
            window.addEventListener('keydown', handlePressEsc)
        } else {
            window.removeEventListener('keydown', handlePressEsc);
        }
        return () => {
            window.removeEventListener('keydown', handlePressEsc);
        }
    }, [visible])


    const handlePressEsc = (e) => {
        if (e.key === 'Escape') {
            setVisible(false)
        }
    }

    const _cleanSearchedCampaigns = useCallback(
        (data) => {
            dispatch(cleanSearchedCampaigns(data));
        },
        [dispatch]
    );

    const _setCampaignSearchQuery = useCallback(
        (data) => {
            dispatch(setCampaignSearchQuery(data));
        },
        [dispatch]
    );
    const _setOffset = useCallback(
        (data) => {
            dispatch(setCampaignOffset(data));
        },
        [dispatch]
    );

    const handleClickButton = (e) => {
        e.preventDefault()
        setVisible(!visible)
    }

    const {matchesAll} = useMediaQueries({
        screen: "screen",
        width: "(max-width: 1200px)",
    });

    const handleChange = (e) => setSearch(e?.target?.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search && campaignSearchQuery !== search && router?.pathname === (lang === 'en' ? SEARCH_ROUTE_EN : SEARCH_ROUTE)) {
            _cleanSearchedCampaigns([])
            _setOffset(0)
            _setCampaignSearchQuery(search)
            setVisible(false)
            if(closeNavMenu){
                closeNavMenu()
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
        } else if (router?.pathname !== (lang === 'en' ? SEARCH_ROUTE_EN : SEARCH_ROUTE) && search) {
            router.push(lang === 'en' ? SEARCH_ROUTE_EN : SEARCH_ROUTE)
            _cleanSearchedCampaigns([])
            _setOffset(0)
            _setCampaignSearchQuery(search)
            setVisible(false)
        }

    }

    return (
        <form className={`header_search_form ${formClassName}`} onSubmit={handleSubmit}>
            {(visible || alwaysShow) && (
                <>
                    <div className={`search_input_wrapper ${inputWrapperClassName}`}>
                        <input
                            className={`search_input ${inputClassName}`}
                            type='text'
                            placeholder={placeholder || t("search.placeholder")}
                            value={search}
                            onChange={handleChange}
                            autoFocus={!matchesAll}
                        />
                    </div>
                </>
            )
            }
            {!visible
                ?
                <button type='button' className={`search_open_button search_button ${openButtonClass}`}
                        onClick={handleClickButton}>
                    <svg className="search_icon" aria-labelledby="title desc" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"><title id="title">Search
                        Icon</title>
                        <desc id="desc">A magnifying glass icon.</desc>
                        <g className="search-path" fill="none">
                            <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4"/>
                            <circle cx="8" cy="8" r="7"/>
                        </g>
                    </svg>
                </button>
                :
                <CloseButton aria-label="Hide" onClick={handleClickButton}
                             className={`search_close_button ${closeButtonClass}`}/>
            }
        </form>
    );
}

export default Search;