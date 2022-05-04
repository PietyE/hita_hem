import {takeEvery, call, put} from "redux-saga/effects";
import api from "api";
import {
    GET_FAQ_CATEGORIES,
    FAQ_SEARCH,
    GET_ONE_CATEGORY,
    GET_QUESTION,
} from "constants/actionsConstant";
import {
    saveOneCategory,
    saveSearchResults,
    set404InQuestion,
    setFaqCategories,
    setFaqFetching,
    setQuestion
} from "../actions/faq";
import {setError} from "../actions/errors";

const {faq} = api;


function* getCategoriesWorker() {
    try {
        yield put(setFaqFetching(true))
        const res = yield call([faq, "getCategoriesList"])
        yield put(setFaqCategories(res?.data))

    } catch (error) {
        yield put(
            setError({ status: error?.response?.status, data: error?.response?.data })
        );
    } finally {
        yield put(setFaqFetching(false))
    }
}

function* faqSearchWorker({payload}) {
    try {
        yield put(setFaqFetching(true))
        const res = yield call([faq, "faqSearch"], payload)
        yield put(saveSearchResults(res?.data))
    } catch (error) {
        yield put(
            setError({ status: error?.response?.status, data: error?.response?.data })
        );
    } finally {
        yield put(setFaqFetching(false))
    }
}

function* getFaqByCategoryWorker({payload}) {
    try {
        yield put(setFaqFetching(true))
        const res = yield call([faq, "getByCategory"], payload)
        yield put(saveOneCategory(res?.data))
    } catch (error) {
        yield put(
            setError({ status: error?.response?.status, data: error?.response?.data })
        );
    } finally {
        yield put(setFaqFetching(false))
    }
}

function* getFaqQuestionWorker({payload}) {
    try {
        yield put(setFaqFetching(true))
        const res = yield call([faq, "getQuestion"], payload)
        yield put(setQuestion(res?.data))
    } catch (error) {
        if(error.response.status === 404){
            yield put(set404InQuestion(true))
        }else{
            yield put(
                setError({ status: error?.response?.status, data: error?.response?.data })
            );
        }
    } finally {
        yield put(setFaqFetching(false))
    }
}


export function* faqWatcher() {
    yield takeEvery(GET_FAQ_CATEGORIES, getCategoriesWorker);
    yield takeEvery(FAQ_SEARCH, faqSearchWorker);
    yield takeEvery(GET_ONE_CATEGORY, getFaqByCategoryWorker);
    yield takeEvery(GET_QUESTION, getFaqQuestionWorker);
}