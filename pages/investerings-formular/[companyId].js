import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";

import Progress from "components/Proggres";
import PersonalDetails from "containers/ProfilePage/PersonalDetails";
import SpinnerStyled from "components/ui/Spinner";
import {
    clearCompany,
    getCompanyBySlag,
    makePayment,
} from "redux/actions/companies";
import {
    getBusinessGoalSelector,
    getPercentageSelector,
    getCompanyNameSelector,
    getBusinessShapePriceSelector,
    getBusinessCurrencySelector,
    canUserInvestSelector,
    getIsCompanyClosedSelector,
    getMinimumInvestAmountSelector,
} from "redux/reducers/companies";
import {
    getIsSignInUserSelector,
    getIsFetchingAuthSelector,
    getTotalPaymentsByCompanySelector,
} from "redux/reducers/user";

import {HOME_ROUTE} from "constants/routesConstant";
import useMoneyFormat from "customHooks/useMoneyFormat";
import {recaptcha} from "../../utils/recaptcha";

const numbers_validation = /^[0-9]{1,8}[,.]{0,1}[0-9]{0,2}$/;

const InvestFormPage = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [amount, setAmount] = useState("");

    let history = useRouter();
    const moneyFormat = useMoneyFormat()
    const isCompanyClosed = useSelector(getIsCompanyClosedSelector);
    const userCanInvest = useSelector(canUserInvestSelector);
    const isAuth = useSelector(getIsSignInUserSelector);
    const isFetching = useSelector(getIsFetchingAuthSelector);

    const [showContent, setShowContent] = useState(false)

    useEffect(() => {

        if (!isAuth || userCanInvest === 'false' || isCompanyClosed) {
            if (showContent !== false) {
                setShowContent(false)
                history.push(HOME_ROUTE)
            }
        } else {
            if (showContent !== true) {
                setShowContent(true)
            }
        }
    }, [isAuth, userCanInvest, isCompanyClosed, history]);

    const companyId = history.query.companyId;

    const _makePayment = useCallback(
        (id) => {
            dispatch(makePayment(id));
        },
        [dispatch]
    );
    const _getCompanyDetail = useCallback(
        (id) => {
            dispatch(getCompanyBySlag(id));
        },
        [dispatch]
    );
    const _clearCompanyDetail = useCallback(() => {
        dispatch(clearCompany());
    }, [dispatch]);

    useEffect(() => {
        if (companyId) {
            _getCompanyDetail(companyId);
        }

        return () => {
            _clearCompanyDetail();
        };
    }, [_clearCompanyDetail, _getCompanyDetail, companyId]);

    const companyName = useSelector(getCompanyNameSelector);
    const target = useSelector(getBusinessGoalSelector);
    const percentage = useSelector(getPercentageSelector);
    const price = useSelector(getBusinessShapePriceSelector);
    const paymentByCompany = useSelector(getTotalPaymentsByCompanySelector);
    const currency = useSelector(getBusinessCurrencySelector);
    const minimumInvestAmount = useSelector(getMinimumInvestAmountSelector)


    const shares = Math.floor(amount.replace(/,/, '.') / price);

    const currentInvestment = shares * price;
    const total = Number(paymentByCompany) + (currentInvestment || 0);
    const isButtonDisabled = Number(amount) < Number(minimumInvestAmount)

    const handleChangeInput = (e) => {
        if (numbers_validation.test(e.target.value) || !e.target.value) {
            setAmount(e.target.value.replace(",", "."));
        }
    };

    const onSubmit = (data) => {
        recaptcha('make_payment', _makePayment, data)
        // _makePayment(data);
        setAmount("");
    };
    return (
        <>
            {isFetching && <SpinnerStyled/>}
            {showContent &&
            (<section className="invest_form_section">
                <div className='invest_form_section_content_container'>
                    <h1 className="invest_form_section_title">{companyName}</h1>
                    <p className="invest_form_section_text">
                        {t("invest_form_page.main_text")}
                    </p>
                    <div className="invest_form_content_block">
                        <div className="invest_form_invest_container">
                            <div className="invest_form_invest_progress_bar_container">
                                <div className="invest_form_invest_progress_bar_label">
                                    <span>{t("invest_form_page.progress_rise")}</span>
                                    <span>{t("invest_form_page.progress_target")}</span>
                                </div>
                                <Progress
                                    percent={percentage}
                                    currency={currency}
                                    target={moneyFormat.format(target)}
                                />
                            </div>
                            <div className="invest_form_invest">
                                <h2 className="invest_form_invest_title">
                                    {t("invest_form_page.invest_title")}
                                </h2>
                                <p className="invest_form_invest_text">
                                    {t("invest_form_page.invest_text")}{" "}
                                    <span>
                    {currency} {minimumInvestAmount ? moneyFormat.format(minimumInvestAmount) : ``}


                </span>
                                </p>
                                <label className="invest_form_invest_label">
                                    {t("invest_form_page.invest_label")}
                                    <br/>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={handleChangeInput}
                                        placeholder={`${t(
                                            "invest_form_page.invest_placeholder"
                                            // )} ${currency} ${moneyFormat.format(price)}`}
                                        )} ${currency} ${minimumInvestAmount ? moneyFormat.format(minimumInvestAmount) : ''}`}
                                        className="invest_form_invest_input"
                                        pattern=""
                                    />
                                </label>
                                <h2 className="invest_form_invest_statistics_title">
                                    {t("invest_form_page.statistics_title")}
                                </h2>
                                <div className="invest_form_invest_shares_container">
                                    <p className="invest_form_invest_shares">
                                        {shares ? moneyFormat.format(shares) : 0} {t("invest_form_page.statistics_shares")}

                                    </p>
                                    <p className="invest_form_invest_shares_total">
                                        {currency} {currentInvestment ? moneyFormat.format(currentInvestment) : 0}
                                    </p>
                                </div>
                                <p className="invest_form_invest_statistics_text">
                                    {t("invest_form_page.statistics_text")}
                                </p>
                                <div className="invest_form_content_block_footer">
                                    <p>{t("invest_form_page.invest_form_total")}</p>
                                    <p className="invest_form_content_block_footer_total">
                                        {" "}
                                        {currency} {total ? moneyFormat.format(total) : 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="invest_form_profile_container">
                            <PersonalDetails
                                type="invest-form"
                                onMakePayment={onSubmit}
                                disabled={isButtonDisabled}
                                currentInvestment={currentInvestment}
                                sectionClassName="invest_form_profile_personal_details"
                            />
                        </div>
                    </div>
                </div>
            </section>)}
        </>
    );
};

export default InvestFormPage;
