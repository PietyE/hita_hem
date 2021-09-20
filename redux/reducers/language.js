import { SET_LANGUAGE } from "constants/actionsConstant";
import { lang } from "constants/languageConstant";

const initState = {
  selectedLanguage: lang.en.code,
};

export const getSelectedLangSelector = (state) =>
  state.language.selectedLanguage;

export const language = (state = initState, actions) => {
  switch (actions.type) {
    case SET_LANGUAGE:
      return { selectedLanguage: actions.payload };

    default:
      return state;
  }
};
