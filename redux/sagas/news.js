import { takeEvery, call, put } from "redux-saga/effects";
import {setError} from "../actions/errors";
import {setNewsFetching, setNewsSeo} from "../actions/news";
import {
    GET_NEWS_PAGE_SEO,
} from "constants/actionsConstant";

import api from "../../api";



function* getNewsPageSeoWorker() {
    try {
        yield put(setNewsFetching(true));
        const { news } = api;
        const res = yield call([news, "getSeo"]);
        yield put(setNewsSeo(res?.data.seo))
    } catch (error) {
        yield put(
            setError({ status: error?.response?.status, data: error?.response?.data })
        );
    } finally {
        yield put(setNewsFetching(false));
    }
}

export function* newsPageWatcher() {
    yield takeEvery(GET_NEWS_PAGE_SEO, getNewsPageSeoWorker);
}