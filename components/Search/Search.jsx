import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import CloseButton from 'react-bootstrap/CloseButton'
import {cleanSearchedCampaigns, searchCampaigns} from "redux/actions/companies";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

const Search = ({formClassName, inputWrapperClassName, inputClassName, openButtonClass, closeButtonClass, alwaysShow, placeholder}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const inputRef = useRef()
    const router = useRouter();

    const [visible,setVisible] = useState(false)

    const pathname = router?.pathname

    useEffect(()=>{
        setVisible(false)
    },[pathname])

    const _search = useCallback(
        (data) => {
            dispatch(searchCampaigns(data));
        },
        [dispatch]
    );
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
    const handleSubmit = (e) => {
        e.preventDefault()
        if(inputRef?.current?.value){
            _cleanSearchedCampaigns([])
            _search({data: inputRef?.current?.value, action: router})
            setVisible(false)
        }
    }

    return (
        <form className={`header_search_form ${formClassName}`} onSubmit={handleSubmit}>
            { (visible || alwaysShow) && (
                <>
                <div className={`search_input_wrapper ${inputWrapperClassName}`}>
                    <input
                        className={`search_input ${inputClassName}`}
                        type='text'
                        placeholder={placeholder || t("search.placeholder")}
                        ref={inputRef}
                        autoFocus
                    />
                </div>
                {/*<span className='search_hint'>{t("search.hint")}</span>*/}
                </>
            )
            }
            { !visible
                ?
                <button type='button' className={`search_open_button search_button ${openButtonClass}`} onClick={handleClickButton}>
                    <svg className="search_icon" aria-labelledby="title desc" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"><title id="title">Search
                        Icon</title>
                        <desc id="desc">A magnifying glass icon.</desc>
                        <g className="search-path" fill="none" >
                            <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4"/>
                            <circle cx="8" cy="8" r="7" />
                        </g>
                    </svg>
                </button>
                :
                <CloseButton aria-label="Hide" onClick={handleClickButton} className={`search_close_button ${closeButtonClass}`}  />
                // <button type='button' className='search_close_button search_button' onClick={handleClickButton}>X</button>
            }
        </form>
    );
}

export default Search;