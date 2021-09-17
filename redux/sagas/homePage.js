import { takeEvery, call, put } from 'redux-saga/effects'

import api from 'api'
import {GET_HOME_PAGE} from 'constants/actionsConstant'
import { setIsFetchingHomePage, setHomePage } from 'redux/actions/homePage'
import {setError} from '../actions/errors';


function* homePageWorker() {
    try {
        yield put(setIsFetchingHomePage(true))
        const { homePage } = api
        const res = yield call([homePage, 'get'])
        const { data, status } = res
        if (data && status === 200) {
            yield put(setHomePage(data))
        }
    } catch (error) {
        yield put(setError({status:error?.response?.status, data:error?.response?.data}))
    } finally {
        yield put(setIsFetchingHomePage(false))
    }
}

export function* homePageWatcher() {
    yield takeEvery(GET_HOME_PAGE, homePageWorker)
}