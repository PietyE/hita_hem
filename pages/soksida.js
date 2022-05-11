import React, {useCallback, useEffect} from 'react';
import CampaignsList from "../components/CampaignsList";
import SpinnerStyled from "../components/ui/Spinner";
import MetaTags from "../components/MetaTags";
import {useDispatch, useSelector} from "react-redux";
import {
    getCampaignOffsetSelector, getCampaignSearchQuerySelector,
    getIsFetchingCampaignsSelector, getIsMoreCampaignsSelector,
    getListOfFoundCampaignsSelector
} from "../redux/reducers/companies";
import isEqual from "lodash/isEqual";
import SearchForm from "../containers/InvestmentOpportunitiesPage/SearchForm";
import Button from "../components/ui/Button";
import {useTranslation} from "react-i18next";
import {cleanSearchedCampaigns, searchCampaigns, setCampaignOffset} from "../redux/actions/companies";
import Schema from "../components/Schema";
import makeSearchSchema from "../Schemas/searchSchema";

const Soksida = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const isFetching = useSelector(getIsFetchingCampaignsSelector);
    const companiesList = useSelector(getListOfFoundCampaignsSelector, isEqual) || [];
    const isMoreCampaigns = useSelector(getIsMoreCampaignsSelector);
    const campaignsOffset = useSelector(getCampaignOffsetSelector)
    const campaignSearchQuery = useSelector(getCampaignSearchQuerySelector)

    useEffect(()=>{
        _cleanSearchedCampaigns()
        _setOffset(0)
        return ()=> {
            _cleanSearchedCampaigns()
            _setOffset(0)
        }
    },[])

    useEffect(()=>{
            _search({data: campaignSearchQuery, offset: campaignsOffset})
    },[campaignSearchQuery, campaignsOffset])

    const _search = useCallback((data) => {
            dispatch(searchCampaigns(data));
        },[dispatch]);

    const _cleanSearchedCampaigns = useCallback(() => {
        dispatch(cleanSearchedCampaigns([]));
    }, [dispatch]);
    const _setOffset = useCallback(
        (data) => {
            dispatch(setCampaignOffset(data));
        },
        [dispatch]
    );

    const getMore = () => {
        _setOffset(campaignsOffset + 9)
    }

    const seo = {
        title: '',
        description: '',
    }

    return (
        <>
            <MetaTags seo={seo}/>
            <Schema makeSchema={makeSearchSchema} data={''} keyName='search'/>

            <section className='search_section'>
            {isFetching && <SpinnerStyled/>}
                <SearchForm/>
            <CampaignsList content={companiesList} className='search_campaign_list'/>
            {!isFetching  && !companiesList.length && (
                <p className='empty_search_results'>{t("investment_opportunities_page.no_results")}</p>
            )}
            {isMoreCampaigns && !isFetching && (
                <Button
                    colorStyle="dark-green"
                    className="invest_opp_middle_button"
                    onClick={getMore}
                    disabled={!isMoreCampaigns}
                >
                    {t("investment_opportunities_page.more_campaigns_button")}
                </Button>
            )}
        </section>
        </>
    );
}

export default Soksida;