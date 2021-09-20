import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampaignsList from "components/CampaignsList";
import FilterMobileMenu from "./FilterMobileMenu";
import Button from "components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import {
  getFilterSelector,
  getIsMoreCampaignsSelector,
} from "redux/reducers/companies";
import {
  getCompaniesList,
  setFilter,
  resetCompanyList,
} from "redux/actions/companies";
import { useTranslation } from "react-i18next";

const CampaignsListSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentFilter = useSelector(getFilterSelector);
  const isMoreCampaigns = useSelector(getIsMoreCampaignsSelector);

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterValuesArray, setFilterValuesArray] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);

  const _setFilter = useCallback(
    (data) => {
      dispatch(setFilter(data));
    },
    [dispatch]
  );

  const _getCompanyList = useCallback(
    (data) => {
      dispatch(getCompaniesList(data));
    },
    [dispatch]
  );

  const _resetCompanyList = useCallback(() => {
    dispatch(resetCompanyList());
  }, [dispatch]);

  useEffect(() => {
    if (!currentFilter) {
      _getCompanyList();
    } else {
      _getCompanyList({ filter: currentFilter, offset: currentOffset });

      setFilterValuesArray(currentFilter);
    }
  }, [_getCompanyList, currentFilter, currentOffset]);

  useEffect(() => {
    _resetCompanyList();
    setCurrentOffset(0);
  }, [_resetCompanyList, currentFilter]);

  const setFilterList = (data) => {
    if (filterValuesArray.includes(data)) {
      const filteredArray = filterValuesArray.filter((el) => el !== data);
      setFilterValuesArray(filteredArray);
    } else {
      setFilterValuesArray([...filterValuesArray, data]);
    }
  };

  const handleChangeCheckbox = (e) => {
    if (e.target.name === "live") {
      setFilterList(3);
    } else if (e.target.name === "upcoming") {
      setFilterList(1);
    } else if (e.target.name === "closed") {
      setFilterList(4);
    } else if (e.target.dataset.value === "live") {
      _setFilter(3);
    } else if (e.target.dataset.value === "upcoming") {
      _setFilter(1);
    } else if (e.target.dataset.value === "closed") {
      _setFilter(4);
    }
  };

  const setFilterMenu = () => {
    setShowFilterMenu(true);
    window?.scrollTo(0, 0);
  };

  const getMoreCampaigns = () => {
    setCurrentOffset(currentOffset + 9);
  };

  const handleSubmitFilters = () => {
    _setFilter(filterValuesArray);
  };

  return (
    <section className="invest_opp_middle_container">
      <div className="invest_opp_nav">
        <h2 className="invest_opp_middle_title">
          {t("investment_opportunities_page.title")}
        </h2>

        <Dropdown className="invest_opp_dropdown">
          <Dropdown.Toggle className="invest_opp_select">
            {t("investment_opportunities_page.status")}
            <div className="invest_opp_arrow">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="invest_opp_dropdown_menu">
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
            </div>
            <Dropdown.Item>
              <Button
                colorStyle="light-blue"
                type="button"
                className="invest_opp_menu_button"
                onClick={handleSubmitFilters}
              >
                {t("investment_opportunities_page.dropdown_button")}
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          colorStyle="grey"
          type="button"
          className="invest_opp_mobile_filter_btn"
          onClick={setFilterMenu}
        >
          {t("investment_opportunities_page.filter_button")}
        </Button>
      </div>
      {currentFilter.length > 0 && (
        <div className="invest_opp_filters_list">
          <span className="invest_opp_filters_list_text">
            {t("investment_opportunities_page.filter_modal_text")}
          </span>
          {currentFilter.includes(3) && (
            <div className="invest_opp_active_filter">
              {t("investment_opportunities_page.live")}
              <FontAwesomeIcon
                icon={faTimes}
                data-value="live"
                onClick={handleChangeCheckbox}
                className="invest_opp_delete_filter"
              />
            </div>
          )}
          {currentFilter.includes(1) && (
            <div className="invest_opp_active_filter">
              {t("investment_opportunities_page.upcoming")}
              <FontAwesomeIcon
                icon={faTimes}
                data-value="upcoming"
                onClick={handleChangeCheckbox}
                className="invest_opp_delete_filter"
              />
            </div>
          )}
          {currentFilter.includes(4) && (
            <div className="invest_opp_active_filter">
              {t("investment_opportunities_page.closed")}
              <FontAwesomeIcon
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
        />
      )}
      <CampaignsList type="invest" />
      {isMoreCampaigns && (
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
