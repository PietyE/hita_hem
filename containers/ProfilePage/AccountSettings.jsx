import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ResetEmail from "./ResetEmail";
import SubscribeItem from "./SubscribeItem";
import AccountSettingsResetPassword from "./AccountSettingsResetPassword";
import { useTranslation } from "react-i18next";
import { setShowConfirmationOfAccountDeleting } from "redux/actions/authPopupWindows";
import SplitLine from "components/ui/SplitLine";
import {getIsBankIdResident, getIsSocialAccount} from "redux/reducers/user";
import {changeUnsubscribeList, requestSubscribeList} from "redux/actions/user";
import isEmpty from "lodash/isEmpty";
import {getSubscribeListSelector, getUnsubscribesSelector} from "redux/reducers/user";
import Button from "../../components/ui/Button";
import isEqual from "lodash/isEqual";
import {recaptcha} from "../../utils/recaptcha";

const AccountSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [unsubscribesList, setUnsubscribesList] = useState([])
    const isBankIdResident = useSelector(getIsBankIdResident)
    const isSocialAccount = useSelector(getIsSocialAccount)
    const subscribeList = useSelector(getSubscribeListSelector)
    const unsubscribes = useSelector(getUnsubscribesSelector)
    const _requestSubscribeList = useCallback(
        () => {
            dispatch(requestSubscribeList());
        },
        [dispatch]
    );
    useEffect(()=>{
        _requestSubscribeList()
    },[])

    useEffect(()=>{
        if(unsubscribes?.length > 0){
            setUnsubscribesList(unsubscribes)
        }
    },[unsubscribes])

    const changeUnsubscribesList = (data) =>{
        if(unsubscribesList.find(el=>el === data)){
            const newList = unsubscribesList.filter((el)=>el !== data)
            setUnsubscribesList(newList)

        }else{
            const newList = [...unsubscribesList]
            newList.push(data)
            setUnsubscribesList(newList)
        }
    }
    const _changeUnsubscribeList = useCallback(
        (data) => {
            dispatch(changeUnsubscribeList(data));
        },
        [dispatch]
    );


    const handleClickDelete = () => {
      dispatch(setShowConfirmationOfAccountDeleting(true));
  };
    const handleChangeUnsubscribe =() =>{
        const isArraysEqual = isEqual(unsubscribesList, unsubscribes)

        if(!isArraysEqual){
            recaptcha('request_for_change_email',_changeUnsubscribeList,unsubscribesList)

        }
    }
  return (
    <section className="account_settings_container">
      <h2 className="account_settings_title">
        {t("profile_page.account.title")}
      </h2>
        <div className="account_settings_forms_container">
            <div className="account_settings_form">
                {!isBankIdResident && isEmpty(isSocialAccount) &&
                (
                    <>
                        <ResetEmail />
                        <SplitLine className='account_settings_split_line'/>
                        <AccountSettingsResetPassword />
                        <SplitLine className='account_settings_split_line'/>
                    </>)
                }
                <p className="account_settings_text_delete" onClick={handleClickDelete}>
                    {t("profile_page.account.text_delete")}
                </p>
                <p className="account_settings_text" style={isBankIdResident?{marginBottom: '0'}: {}}>
                    {t("profile_page.account.text")}
                </p>
            </div>
            <div className='account_settings_subscribes'>
                <h2 className='account_settings_subscribes_title'>
                    Subscribes
                </h2>
                <ul className='account_settings_subscribe_list'>
                    {subscribeList.length > 0 && (
                        subscribeList.map((subscribe)=>
                            <SubscribeItem key={subscribe?.pk}
                                           data={subscribe}
                                           unsubscribes={unsubscribesList}
                                           changeUnsubscribesList={changeUnsubscribesList}/>
                        )
                    )}
                </ul>
                <Button
                    type="submit"
                    colorStyle="dark-green"
                    className="account_settings_subscribe_button"
                    onClick={handleChangeUnsubscribe}
                >
                    Submit subscribes
                </Button>
            </div>
        </div>

    </section>
  );
};

export default AccountSettings;
