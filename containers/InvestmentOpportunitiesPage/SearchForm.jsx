import React, {useCallback, useEffect, useState} from 'react';
import ButtonStyled from "../../components/ui/Button";
import {useTranslation} from "react-i18next";
import {cleanSearchedCampaigns, setCampaignOffset, setCampaignSearchQuery} from "../../redux/actions/companies";
import {useDispatch, useSelector} from "react-redux";
import {getCampaignSearchQuerySelector} from "../../redux/reducers/companies";

const SearchForm = ({
                        searchContainerClassName,
                        searchTitleClassName,
                        searchFormClassName,
                        searchInputClassName,
                        searchButtonClassName,
                    }) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const campaignSearchQuery = useSelector(getCampaignSearchQuerySelector)
    const [search, setSearch] = useState('')


    useEffect(() => {
        if (campaignSearchQuery) {
            setSearch(campaignSearchQuery.toString())
        }
    }, [campaignSearchQuery])

    const _cleanSearchedCampaigns = useCallback(
        (data) => {
            dispatch(cleanSearchedCampaigns(data));
        },
        [dispatch]
    );
    const _setOffset = useCallback(
        (data) => {
            dispatch(setCampaignOffset(data));
        },
        [dispatch]
    );
    const _setCampaignSearchQuery = useCallback(
        (data) => {
            dispatch(setCampaignSearchQuery(data));
        },
        [dispatch]
    );

    const handleChangeSearch = (e) => {
        setSearch(e?.target?.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search && campaignSearchQuery !== search) {
            _setOffset(0)

            _setCampaignSearchQuery(search)
            _cleanSearchedCampaigns([])
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