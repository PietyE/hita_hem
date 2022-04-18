import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import CloseButton from 'react-bootstrap/CloseButton'

const Search = () => {
    const { t } = useTranslation();
    const [visible,setVisible] = useState(false)

    const handleClickButton = (e) => {
        e.preventDefault()
        setVisible(!visible)
    }

    return (
        <form className='header_search_form'>
            { visible && (
                <>
                <div className='search_input_wrapper'>
                    <input className='search_input' type='text' placeholder={t("search.placeholder")}/>
                </div>
                <span className='search_hint'>{t("search.hint")}</span>
                </>
            )
            }
            { !visible
                ?
                <button className='search_open_button search_button' onClick={handleClickButton}>
                    <svg className="search_icon" aria-labelledby="title desc" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"><title id="title">Search
                        Icon</title>
                        <desc id="desc">A magnifying glass icon.</desc>
                        <g className="search-path" fill="none" >
                            <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4"/>
                            <circle cx="8" cy="8" r="7" />
                        </g>
                    </svg>
                </button>
                :
                <CloseButton aria-label="Hide" onClick={handleClickButton} className='search_close_button'  />
                // <button className='search_close_button search_button' onClick={handleClickButton}>X</button>
            }
        </form>
    );
}

export default Search;