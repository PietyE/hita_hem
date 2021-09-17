import React, { useCallback, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import ButtonStyled from "components/ui/Button";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setFilter } from "redux/actions/companies";
import {
  faCheck,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const FilterMobileMenu = ({
  onChangeFilter,
  onClose,
  currentFilters,
  changeCurrentFilter,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const _setFilter = useCallback(
    (data) => {
      dispatch(setFilter(data));
    },
    [dispatch]
  );

  const resetFilters = () => {
    changeCurrentFilter([]);
  };

  const handleSubmitFilters = () => {
    _setFilter(currentFilters);
    onClose(false);
  };

  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (e) => {
    if (activeTab === e.target.dataset.value) {
      setActiveTab([]);
      return;
    }
    setActiveTab(e.target.dataset.value);
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose(false);
  };

  return (
    <div className="filter_mobile_menu">
      <button className="filter_mobile_menu_close_button" onClick={handleClose}>
        &#215;
      </button>
      <h2 className="filter_mobile_menu_title">
        {t("investment_opportunities_page.filter_results")}
      </h2>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              className="filter_mobile_menu_accordion_button"
              data-value="1"
              onClick={handleTabClick}
            >
              {t("investment_opportunities_page.status")}
              <FontAwesomeIcon
                icon={activeTab === "1" ? faChevronDown : faChevronRight}
                className="filter_mobile_menu_accordion_button_chevron"
              />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="filter_mobile_menu_accordion_tab">
              <ButtonStyled
                colorStyle={
                  currentFilters.includes(3)
                    ? "light-blue-white-text"
                    : "outline-blue"
                }
                className="filter_mobile_menu_accordion_tab_button"
                onClick={onChangeFilter}
                name="live"
              >
                {t("investment_opportunities_page.live")}
                {currentFilters.includes(3) && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="filter_mobile_menu_accordion_tab_button_chevron"
                  />
                )}
              </ButtonStyled>
              <ButtonStyled
                colorStyle={
                  currentFilters.includes(1)
                    ? "light-blue-white-text"
                    : "outline-blue"
                }
                className="filter_mobile_menu_accordion_tab_button"
                onClick={onChangeFilter}
                name="upcoming"
              >
                {t("investment_opportunities_page.upcoming")}
                {currentFilters.includes(1) && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="filter_mobile_menu_accordion_tab_button_chevron"
                  />
                )}
              </ButtonStyled>
              <ButtonStyled
                colorStyle={
                  currentFilters.includes(4)
                    ? "light-blue-white-text"
                    : "outline-blue"
                }
                onClick={onChangeFilter}
                name="closed"
                className="filter_mobile_menu_accordion_tab_button_last"
              >
                {t("investment_opportunities_page.closed")}
                {currentFilters.includes(4) && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="filter_mobile_menu_accordion_tab_button_chevron"
                  />
                )}
              </ButtonStyled>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <div className="filter_mobile_menu_buttons_container">
        <ButtonStyled
          colorStyle="link"
          className="filter_mobile_menu_buttons_cancel"
          onClick={resetFilters}
        >
          {t("investment_opportunities_page.mobile_filter_button_clear")}
        </ButtonStyled>
        <ButtonStyled
          colorStyle="grey"
          className="filter_mobile_menu_buttons_apply"
          onClick={handleSubmitFilters}
        >
          {t("investment_opportunities_page.mobile_filter_button_apply")}
        </ButtonStyled>
      </div>
    </div>
  );
};

export default FilterMobileMenu;
