import { takeEvery } from "redux-saga/effects";
import Cookies from "js-cookie";

import { CHANGE_LANGUAGE } from "constants/actionsConstant";

function* setLangWorker({ payload }) {
  try {
    Cookies.set("NEXT_LOCALE", payload);
    const pathname = window.location.pathname;
    let newPathName = "";
    // if (payload === "en") {
    //   newPathName = pathname.replace(pathname.length === 3 ? "sv" : "/sv", "");
    // }
    // if (payload === "sv") {
    //   newPathName = pathname.replace("/", "/sv/");
    // }
    let fullPathName= '';

    if (payload === "sv") {
      switch(pathname){
        case '/en/about-us':
          fullPathName = '/en/om-oss'
          break
        case '/en/investment-opportunities':
          fullPathName = '/en/investeringsmojligheter'
          break
        case '/en/raise':
          fullPathName = '/en/sok-kapital'
          break

        default:
          fullPathName = pathname
      }

      if(pathname.includes('/company')){
        fullPathName = pathname.replace('/company','/foretag')

      }

      if(pathname.includes('/invest-form')){
        fullPathName = pathname.replace('/invest-form','/investerings-formular')
      }


      newPathName = fullPathName.replace(fullPathName.length === 3 ? "en" : "/en", "");
    }
    if (payload === "en") {
      switch(pathname){
        case '/om-oss':
          fullPathName = '/about-us'
          break
        case '/investeringsmojligheter':
          fullPathName = '/investment-opportunities'
          break
        case '/sok-kapital':
          fullPathName = '/raise'
          break
        default:
          fullPathName = pathname
      }
      if(pathname.includes('/foretag')){
        fullPathName = pathname.replace('/foretag','/company')
      }

      if(pathname.includes('/investerings-formular')){
        fullPathName = pathname.replace('/investerings-formular','/invest-form')
      }


      newPathName = fullPathName.replace("/", "/en/");
    }

    window.location.replace(newPathName);
  } catch (error) {
    //to do
  }
}

export function* langWatcher() {
  yield takeEvery(CHANGE_LANGUAGE, setLangWorker);
}
