import {useSelector} from "react-redux";
import {getSelectedLangSelector} from "redux/reducers/language";


const useMoneyFormat = () => {
    const currentLanguage = useSelector(getSelectedLangSelector);

    return new Intl.NumberFormat([currentLanguage, "en"], {
        style: "decimal",
    });
}

export default useMoneyFormat