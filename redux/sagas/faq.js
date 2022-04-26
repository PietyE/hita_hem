import {takeEvery, call, put} from "redux-saga/effects";

import api from "api";

const {faq} = api;


import {
    GET_FAQ_CATEGORIES,
    FAQ_SEARCH,
} from "constants/actionsConstant";
import {setFaqFetching} from "../actions/faq";

function* getCategoriesWorker() {
    try {
        yield put(setFaqFetching(true))
        const res = yield call([faq, "getCategoriesList"])
        console.log('res', res)
    } catch (error) {
        console.dir(error)
    } finally {
        yield put(setFaqFetching(false))
    }
}

function* faqSearchWorker({payload}) {
    try {
        yield put(setFaqFetching(true))
        const res = yield call([faq, "faqSearch"], payload)
        console.log('res', res)
    } catch (error) {
        console.dir(error)
    } finally {
        yield put(setFaqFetching(false))
    }
}


export function* faqWatcher() {
    yield takeEvery(GET_FAQ_CATEGORIES, getCategoriesWorker);
    yield takeEvery(FAQ_SEARCH, faqSearchWorker);
}