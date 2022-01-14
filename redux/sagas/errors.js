import {takeEvery, put, select, call} from "redux-saga/effects";
import {getErrorSelector} from "../reducers/errors";
import {setAccount, setAuth, setProfile, setToken} from "../actions/user";
import {
    setNotification,
    setNotificationMessage,
    setNotificationTitle,
} from "../actions/notification";
import {ERROR, SET_AUTH_ERROR, SET_PROFILE_ERROR} from 'constants/actionsConstant';
import api from "../../api";

import isEmpty from "lodash/isEmpty";
import {getSelectedLangSelector} from "../reducers/language";

function* errorHandler() {
    const error = yield select(getErrorSelector);
    const language = yield select(getSelectedLangSelector)
    if(!error?.hideNotification){
        yield put(setNotification(true));
    }
    switch (error?.status) {
        case 500:
            yield put(setNotificationTitle("Internal Server Error: 500"));
            yield put(
                setNotificationMessage(
                    "The server encountered an internal error or misconfiguration and was unable to complete your request."
                )
            );
            break;
        case 401:
            yield put(setAccount({}));
            yield put(setToken({}));
            yield put(setProfile({}));
            yield put(setAuth(false));
            if (typeof window !== "undefined" && localStorage) {
                yield call([localStorage, "removeItem"], "auth_data");
            }

            yield call([api, "deleteToken"]);
            // if (typeof window !== "undefined") {
            //     window.location.reload();
            // }
            // re-login - fix next
            // yield put(setNotificationMessage('The token has expired. re-login'))
            break;
        case (400) :
//////////////////временно пока приходит пустая ошибка по существующей подписке

            if (isEmpty(error)) {
                yield put(setNotificationTitle('Ooops...'))
                yield put(setNotificationMessage(language ==='en'?'Such mail already exists':'Detta email existerar redan'))
            } else {

                if (error.auth) {
                    if(typeof error.auth === 'string'){
                        yield put(setNotificationMessage(error.auth))
                    }else{
                        for (let prop in error.auth) {
                            if ((typeof error.auth[prop] === "object" || typeof error.auth[prop] === 'function') && (error.auth[prop] !== null)) {
                                for (let subProp in error.auth[prop]) {
                                    yield put(setNotificationMessage(error.auth[prop][subProp]))
                                    break
                                }

                            } else {
                                yield put(setNotificationMessage(error.auth[prop]))
                            }
                            break
                        }
                    }


                } else if (error.profile) {
                    if(typeof error.profile === 'string'){
                        yield put(setNotificationMessage(error.profile))
                    }else{
                    for (let prop in error.profile) {
                        if ((typeof error.profile[prop] === "object" || typeof error.profile[prop] === 'function') && (error.profile[prop] !== null)) {
                            for (let subProp in error.profile[prop]) {
                                yield put(setNotificationMessage(error.profile[prop][subProp]))
                                break
                            }

                        } else {
                            yield put(setNotificationMessage(error.profile[prop]))
                        }
                        break
                    }
                    }
                } else if (error.raise) {
                    for (let prop in error.raise) {
                        yield put(setNotificationMessage(error.raise[prop]))
                        break
                    }

                }else if (error.data) {
                    for (let prop in error.data) {
                        yield put(setNotificationMessage(error.data[prop]))
                        break
                    }

                }
            }
        case (404) :
                if (error.auth) {
                    if(typeof error.auth === 'string'){
                        yield put(setNotificationMessage(error.auth))
                    }else{
                        for (let prop in error.auth) {
                            if ((typeof error.auth[prop] === "object" || typeof error.auth[prop] === 'function') && (error.auth[prop] !== null)) {
                                for (let subProp in error.auth[prop]) {
                                    yield put(setNotificationMessage(error.auth[prop][subProp]))
                                    break
                                }
                            } else {
                                yield put(setNotificationMessage(error.auth[prop]))
                            }
                            break
                        }
                    }
                } else if (error.profile) {
                    if(typeof error.profile === 'string'){
                        yield put(setNotificationMessage(error.profile))
                    }else{
                        for (let prop in error.profile) {
                            if ((typeof error.profile[prop] === "object" || typeof error.profile[prop] === 'function') && (error.profile[prop] !== null)) {
                                for (let subProp in error.profile[prop]) {
                                    yield put(setNotificationMessage(error.profile[prop][subProp]))
                                    break
                                }
                            } else {
                                yield put(setNotificationMessage(error.profile[prop]))
                            }
                            break
                        }
                    }
                } else if (error.raise) {
                    for (let prop in error.raise) {
                        yield put(setNotificationMessage(error.raise[prop]))
                        break
                    }
                }else if (error.data) {
                    for (let prop in error.data) {
                        yield put(setNotificationMessage(error.data[prop]))
                        break
                    }
                }
        default:
            return null;
    }
}

export function* errorsWatcher() {
    yield takeEvery([ERROR, SET_AUTH_ERROR, SET_PROFILE_ERROR], errorHandler);
}

// if(error.auth){
//   for (let prop in error.auth) {
//     yield put(setNotificationMessage(error.auth[prop]))
//     break
//   }
//
// }else if(error.profile){
//   for (let prop in error.profile) {
//     if( (typeof error.profile[prop] === "object" || typeof error.profile[prop] === 'function') && (error.profile[prop] !== null) )
//     {
//       for (let subProp in error.profile[prop]) {
//         yield put(setNotificationMessage(error.profile[prop][subProp]))
//         break
//       }
//
//     }else{
//       yield put(setNotificationMessage(error.profile[prop]))
//     }
//     break
//   }
// }else if(error.raise){
//   for (let prop in error.raise) {
//     yield put(setNotificationMessage(error.raise[prop]))
//     break
//   }
// }

//
// for (let type in error) {
//     if ((typeof error[type] === "object" || typeof error[type] === 'function') && (error[type] !== null)) {
//         for (let prop in error[type]) {
//
//             if ((typeof error[type][prop] === "object" || typeof error[type][prop] === 'function') && (error[type][prop] !== null)) {
//                 for (let subProp in error[type][prop]) {
//                     yield put(setNotificationMessage(error[type][prop][subProp]))
//                     break
//                 }
//             } else {
//                 yield put(setNotificationMessage(error[type][prop]))
//                 break
//             }
//
//             yield put(setNotificationMessage(error[type]))
//             break
//         }
//     } else
//         yield put(setNotificationMessage(error))
//     break
// }
// break