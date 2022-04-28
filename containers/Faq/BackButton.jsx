import React, {useCallback} from 'react';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import IconComponent from "../../components/ui/IconComponent";
import {useRouter} from "next/router";
import {FAQ_ROUTE, FAQ_ROUTE_EN} from "../../constants/routesConstant";
import {useDispatch} from "react-redux";
import {saveSearchResults} from "../../redux/actions/faq";
// import {useTranslation} from "react-i18next";

const BackButton = ({lang}) => {
    // const {t} = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter()

    const goToCategories = e => {
        e.preventDefault()
        if (router.pathname !== '/fragor&svar') {
            router.push(lang === 'en' ? FAQ_ROUTE_EN : FAQ_ROUTE)
        } else {
            _resetSearchResults()
        }
    }

    const _resetSearchResults = useCallback(
        () => {
            dispatch(saveSearchResults(null));
        },
        [dispatch]
    );

    return (
        <button className='faq_back_button'
                onClick={goToCategories}
        >
            <IconComponent
                icon={faArrowLeft}
                className="faq_back_button_arrow"
            />
            To Categories
        </button>
    );
}

export default BackButton;