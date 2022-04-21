import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {faCaretDown, faTimes} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import CampaignsList from "components/CampaignsList";
import Button from "components/ui/Button";
import IconComponent from "components/ui/IconComponent";

import {
    getIsMoreCampaignsSelector,
} from "redux/reducers/companies";
import {
    getCompaniesList,
    resetCompanyList, searchCampaigns,
} from "redux/actions/companies";
import {useRouter} from "next/router";
import SearchForm from "./SearchForm";
import {cleanSearchedCampaigns} from "../../redux/actions/companies";
import {clearOffset} from "../../utils/utils";

const FilterMobileMenu = dynamic(() =>
    import("containers/InvestmentOpportunitiesPage/FilterMobileMenu")
);

const DropDownComponent = dynamic(() =>
    import("components/ui/DropDownComponent")
);
const DropdownToggle = dynamic(() =>
    import("components/ui/DropDownComponent").then((c) => c.DropdownToggle)
);
const DropdownMenu = dynamic(() =>
    import("components/ui/DropDownComponent").then((c) => c.DropdownMenu)
);
const DropdownItem = dynamic(() =>
    import("components/ui/DropDownComponent").then((c) => c.DropdownItem)
);

const CampaignsListSection = ({companiesList = [], isFetching}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const isMoreCampaigns = useSelector(getIsMoreCampaignsSelector);
    const router = useRouter()
    const querySearch = router?.query?.search
    const offset = router?.query?.offset || 0
    let activeStatuses =  []

    if(router?.query?.status ){
        activeStatuses = [...router?.query?.status ]
    }

    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filterValuesArray, setFilterValuesArray] = useState([]);


    const _getCompanyList = useCallback((data) => {
            dispatch(getCompaniesList(data));
        },
        [dispatch]
    );

    const _search = useCallback((data) => {
            dispatch(searchCampaigns(data));
        },
        [dispatch]
    );

    const changeStatus =(data) => {
        if (offset) {
            const removeProperty = prop => ({ [prop]: _, ...rest }) => rest
            const removeOffset = removeProperty('offset')
            const queryWithoutOffset = removeOffset(router?.query)
            router.push({
                pathname: router.pathname,
                query: {...queryWithoutOffset,
                    status: data
                },
            })
            _resetCompanyList()
        }else{
            router.push({
                pathname: router.pathname,
                query: {
                    ...router.query,
                    status: data
                }
            })
        }
    }

    const _resetCompanyList = useCallback(() => {
        dispatch(resetCompanyList());
    }, [dispatch]);

    const _cleanSearchedCampaigns = useCallback(() => {
        dispatch(cleanSearchedCampaigns([]));
    }, [dispatch]);

    useEffect(()=>{
        const temp = [...activeStatuses].map(el=>Number(el))
        setFilterValuesArray(temp)
    },[router?.query?.status ])

    useEffect(() => {
        if (offset && companiesList?.length === 0) {
            clearOffset(router)
        } else if (querySearch) {

            _search({data: querySearch, offset: offset})

        } else {
            if (!activeStatuses) {
                _getCompanyList();
            } else {
                const filter = filterValuesArray?.length > 0 ? filterValuesArray : activeStatuses
                _getCompanyList({filter: filter, offset: offset});

                // setFilterValuesArray(activeStatuses);
            }
        }

    }, [router?.query?.status, offset, querySearch]);



    useEffect(() => {
        if (querySearch) {
            _cleanSearchedCampaigns()
        } else {
            _resetCompanyList();
        }
        return () => {
            _cleanSearchedCampaigns()
            _resetCompanyList();
        }
    }, [_resetCompanyList, querySearch]);

    const setFilterList = (data) => {
        if (filterValuesArray.includes(data)) {
            const filteredArray = filterValuesArray.filter((el) => el !== data);
            setFilterValuesArray(filteredArray);
        } else {
            setFilterValuesArray([...filterValuesArray, data]);
        }

    };

    const removeFromQueryStatus = (data) => {
        const newArr = [...activeStatuses].filter(el => Number(el) !== data)
        if(newArr){
            changeStatus(newArr)
        }
    }

    const handleChangeCheckbox = (e) => {
        if (e.target.name === "live") {
            setFilterList(3);
        } else if (e.target.name === "upcoming") {
            setFilterList(1);
        } else if (e.target.name === "completed") {
            setFilterList(2);
        } else if (e.target.name === "closed") {
            setFilterList(4);
        } else if (e.target.dataset.value === "live") {
            removeFromQueryStatus(3);
        } else if (e.target.dataset.value === "upcoming") {
            removeFromQueryStatus(1);
        } else if (e.target.dataset.value === "completed") {
            removeFromQueryStatus(2);
        } else if (e.target.dataset.value === "closed") {
            removeFromQueryStatus(4);
        }
    };

    const setFilterMenu = () => {
        setShowFilterMenu(true);
        window?.scrollTo(0, 0);
    };

    const getMoreCampaigns = () => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                offset: ((router?.query?.offset || 0) + 9)
            }
        })
    };

    const handleSubmitFilters = () => {
        changeStatus(filterValuesArray)
    };
    return (
        <section className="invest_opp_middle_container">
            {!querySearch && (
                <>
                    <div className="invest_opp_nav">
                        <h1 className="invest_opp_middle_title">
                            {t("investment_opportunities_page.title")}
                        </h1>

                        <DropDownComponent className="invest_opp_dropdown">
                            <DropdownToggle className="invest_opp_select">
                                {t("investment_opportunities_page.status")}
                                <div className="invest_opp_arrow">
                                    <IconComponent icon={faCaretDown}/>
                                </div>
                            </DropdownToggle>
                            <DropdownMenu className="invest_opp_dropdown_menu">
                                <div className="invest_opp_checkbox_wrapper">
                                    <label className="invest_opp_label">
                                        <input
                                            className="invest_opp_checkbox"
                                            type="checkbox"
                                            name="live"
                                            value="live"
                                            checked={filterValuesArray.includes(3)}
                                            onChange={handleChangeCheckbox}
                                        />
                                        {t("investment_opportunities_page.live")}
                                    </label>
                                    <label className="invest_opp_label">
                                        <input
                                            className="invest_opp_checkbox"
                                            type="checkbox"
                                            name="upcoming"
                                            value="upcoming"
                                            checked={filterValuesArray.includes(1)}
                                            onChange={handleChangeCheckbox}
                                        />
                                        {t("investment_opportunities_page.upcoming")}
                                    </label>
                                    <label className="invest_opp_label">
                                        <input
                                            className="invest_opp_checkbox"
                                            type="checkbox"
                                            name="closed"
                                            value="closed"
                                            checked={filterValuesArray.includes(4)}
                                            onChange={handleChangeCheckbox}
                                        />
                                        {t("investment_opportunities_page.closed")}
                                    </label>
                                    <label className="invest_opp_label">
                                        <input
                                            className="invest_opp_checkbox"
                                            type="checkbox"
                                            name="completed"
                                            value="completed"
                                            checked={filterValuesArray.includes(2)}
                                            onChange={handleChangeCheckbox}
                                        />
                                        {t("investment_opportunities_page.completed")}
                                    </label>
                                </div>
                                <DropdownItem>
                                    <Button
                                        colorStyle="light-blue"
                                        type="button"
                                        className="invest_opp_menu_button"
                                        onClick={handleSubmitFilters}
                                    >
                                        {t("investment_opportunities_page.dropdown_button")}
                                    </Button>
                                </DropdownItem>
                            </DropdownMenu>
                        </DropDownComponent>
                        <Button
                            colorStyle="grey"
                            type="button"
                            className="invest_opp_mobile_filter_btn"
                            onClick={setFilterMenu}
                        >
                            {t("investment_opportunities_page.filter_button")}
                        </Button>
                    </div>
                    {activeStatuses.length > 0 && (
                        <div className="invest_opp_filters_list">
        <span className="invest_opp_filters_list_text">
        {t("investment_opportunities_page.filter_modal_text")}
        </span>
                            {activeStatuses.includes('3') && (
                                <div className="invest_opp_active_filter">
                                    {t("investment_opportunities_page.live")}
                                    <IconComponent
                                        icon={faTimes}
                                        data-value="live"
                                        onClick={handleChangeCheckbox}
                                        className="invest_opp_delete_filter"
                                    />
                                </div>
                            )}
                            {activeStatuses.includes('1') && (
                                <div className="invest_opp_active_filter">
                                    {t("investment_opportunities_page.upcoming")}
                                    <IconComponent
                                        icon={faTimes}
                                        data-value="upcoming"
                                        onClick={handleChangeCheckbox}
                                        className="invest_opp_delete_filter"
                                    />
                                </div>
                            )}
                            {activeStatuses.includes('2') && (
                                <div className="invest_opp_active_filter">
                                    {t("investment_opportunities_page.completed")}
                                    <IconComponent
                                        icon={faTimes}
                                        data-value="completed"
                                        onClick={handleChangeCheckbox}
                                        className="invest_opp_delete_filter"
                                    />
                                </div>
                            )}
                            {activeStatuses.includes('4') && (
                                <div className="invest_opp_active_filter">
                                    {t("investment_opportunities_page.closed")}
                                    <IconComponent
                                        icon={faTimes}
                                        data-value="closed"
                                        onClick={handleChangeCheckbox}
                                        className="invest_opp_delete_filter"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {showFilterMenu && (
                        <FilterMobileMenu
                            onChangeFilter={handleChangeCheckbox}
                            onClose={setShowFilterMenu}
                            currentFilters={filterValuesArray}
                            changeCurrentFilter={setFilterValuesArray}
                            onSubmit={changeStatus}
                            resetCompanyList = {_resetCompanyList}
                        />
                    )}
                </>
            )}
            {querySearch && (
                <SearchForm/>
            )}
            <CampaignsList content={companiesList}/>
            {!isFetching && querySearch && !companiesList.length && (
                <p className='empty_search_results'>{t("investment_opportunities_page.no_results")}</p>
            )}
            {isMoreCampaigns && !isFetching && (
                <Button
                    colorStyle="dark-green"
                    className="invest_opp_middle_button"
                    onClick={getMoreCampaigns}
                    disabled={!isMoreCampaigns}
                >
                    {t("investment_opportunities_page.more_campaigns_button")}
                </Button>
            )}
        </section>
    );
};

export default CampaignsListSection;
