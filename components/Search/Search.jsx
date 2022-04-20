import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import CloseButton from 'react-bootstrap/CloseButton'
import {cleanSearchedCampaigns, searchCampaigns} from "redux/actions/companies";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getSelectedLangSelector} from "../../redux/reducers/language";

const Search = ({
                    formClassName,
                    inputWrapperClassName,
                    inputClassName,
                    openButtonClass,
                    closeButtonClass,
                    alwaysShow,
                    placeholder,
                }) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const asPath = router?.asPath
    const lang = useSelector(getSelectedLangSelector)
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState('')


    useEffect(() => {
        setVisible(false)
        setSearch('')
    }, [asPath])

    useEffect(() => {
        if(visible){
            window.addEventListener('keydown', handlePressEsc)
        }else{
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

    const handleClickButton = (e) => {
        e.preventDefault()
        setVisible(!visible)
    }

    const handleChange = (e) => setSearch(e?.target?.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search) {
            _cleanSearchedCampaigns([])
            // _search({data: search, action: router})
            router?.push(lang === 'en' ? `/investment-opportunities?search=${search}` : `/investeringsmojligheter?search=${search}` )

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
                            autoFocus
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