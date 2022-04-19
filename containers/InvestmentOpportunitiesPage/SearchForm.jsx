import React, {useCallback, useEffect, useState} from 'react';
import ButtonStyled from "../../components/ui/Button";
import {useTranslation} from "react-i18next";
import {cleanSearchedCampaigns, searchCampaigns} from "../../redux/actions/companies";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

const SearchForm = ({
                        searchContainerClassName,
                        searchTitleClassName,
                        searchFormClassName,
                        searchInputClassName,
                        searchButtonClassName,
                        offset
                    }) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();

    const [search, setSearch] = useState('')

    const querySearch = router?.query?.search

    useEffect(() => {
        if (querySearch) {
            setSearch(querySearch.toString())
        }
    }, [querySearch])

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

    const handleChangeSearch = (e) => {
        setSearch(e?.target?.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search) {
            _cleanSearchedCampaigns([])
            _search({data: search, action: router, offset: offset})
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