import React, {useCallback, useEffect, useState} from 'react';
import ButtonStyled from "../../components/ui/Button";
import {useTranslation} from "react-i18next";
import {cleanSearchedCampaigns} from "../../redux/actions/companies";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getSelectedLangSelector} from "../../redux/reducers/language";

const SearchForm = ({
                        searchContainerClassName,
                        searchTitleClassName,
                        searchFormClassName,
                        searchInputClassName,
                        searchButtonClassName,
                    }) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const lang = useSelector(getSelectedLangSelector)

    const [search, setSearch] = useState('')

    const querySearch = router?.query?.search

    useEffect(() => {
        if (querySearch) {
            setSearch(querySearch.toString())
        }
    }, [querySearch])

    const _cleanSearchedCampaigns = useCallback(
        (data) => {
            dispatch(cleanSearchedCampaigns(data));
        },
        [dispatch]
    );

    const handleChangeSearch = (e) => {
        setSearch(e?.target?.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search && querySearch !== search) {
            let query
            if (lang === 'en') {
                // query = `/investment-opportunities?search=${search}`
                query = {
                    pathname: '/investment-opportunities',
                    search: `?search=${search}`
                }
            } else {
                // query = `/investeringsmojligheter?search=${search}`
                query = {
                    pathname: '/investeringsmojligheter',
                    search: `?search=${search}`
                }
            }
            _cleanSearchedCampaigns([])
            router?.push(query)
            // _setOffset(0)
            // if(router.query.offset){
            //     delete router.query.offset
            // }
            // router.query.search = search
            // router?.push(router)
        }
    }
    return (
        <div className={`invest_search_container ${searchContainerClassName}`}>
            <h2 className={`invest_search_title ${searchTitleClassName}`}>{t("investment_opportunities_page.search_page_title")}</h2>
            <form className={`invest_search_form ${searchFormClassName}`} onSubmit={handleSubmit}>
                <input
                    className={`invest_search_input ${searchInputClassName}`}
                    type='text'
                    value={search}
                    onChange={handleChangeSearch}
                    autoFocus
                />
                <ButtonStyled
                    className={`invest_search_button ${searchButtonClassName}`}
                    colorStyle="dark-green"
                    type='submit'
                >{t("investment_opportunities_page.search_page_button")}</ButtonStyled>
            </form>
        </div>
    );
}

export default SearchForm;