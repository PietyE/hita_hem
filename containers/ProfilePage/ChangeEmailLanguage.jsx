import React, {forwardRef, useCallback} from 'react';
import {useTranslation} from "react-i18next";
import dynamic from "next/dynamic";
import {lang} from "../../constants/languageConstant";
import Button from "../../components/ui/Button";
import IconChevronDown from "../../components/ui/IconChevronDown";
import {useDispatch, useSelector} from "react-redux";
import {getUserEmailLanguageSelector} from "../../redux/reducers/user";
import {setEmailLanguage} from "../../redux/actions/user";
import {recaptcha} from "../../utils/recaptcha";

const DropDownComponent = dynamic(() =>
    import("components/ui/DropDownComponent"), {ssr: false}
);
const DropdownToggle = dynamic(() =>
    import("components/ui/DropDownComponent").then((c) => c.DropdownToggle), {ssr: false}
);
const DropdownMenu = dynamic(() =>
    import("components/ui/DropDownComponent").then((c) => c.DropdownMenu), {ssr: false}
);
const DropdownItem = dynamic(() =>
    import("components/ui/DropDownComponent").then((c) => c.DropdownItem), {ssr: false}
);

const ChangeEmailLanguage = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const emailLanguage = useSelector(getUserEmailLanguageSelector)

    const _setEmailLanguage = useCallback(
        (data) => {
            dispatch(setEmailLanguage(data));
        },
        [dispatch]
    );

    const handleSelectLang = (e) => {
        if (emailLanguage === lang[e.target.dataset.ln].code) return;
        recaptcha('request_for_change_email_language',_setEmailLanguage, {language: lang[e.target.dataset.ln].code} )
    }

    return (
        <section className='account_settings_change_block'>
            <h2 className = "account_settings_form_title account_settings_form_text_wrapper">{t("profile_page.changeEmailLanguage.title")}</h2>
            <DropDownComponent className="ln_button_container account_settings_change_email_language_container">
                <DropdownToggle as={CustomToggle} className='account_settings_change_email_language_button'>
                    {emailLanguage?.toUpperCase()}
                </DropdownToggle>
                <DropdownMenu
                    className="dropdown_menu"
                    onClick={handleSelectLang}
                    align='right'
                >
                    {Object.keys(lang).map((l) => {
                        return (
                            <DropdownItem
                                key={l}
                                className="dropdown_menu_item"
                                data-ln={lang[l].code}
                            >
                                {lang[l].name.toUpperCase()}
                            </DropdownItem>
                        );
                    })}
                </DropdownMenu>
            </DropDownComponent>
        </section>
    );
}
const CustomToggle = forwardRef(({children, onClick}, ref) => (
    <Button
        ref={ref}
        colorStyle="link"
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        <IconChevronDown className="chevron_icon"/>
    </Button>
));
export default ChangeEmailLanguage;