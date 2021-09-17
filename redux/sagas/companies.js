import {call, put, select, takeEvery} from 'redux-saga/effects'

import {
  GET_COMPANIES_LIST,
  GET_COMPANY_BY_ID,
  GET_COMPANIES_HEADER_LIST,
  ADD_POST,
  GET_POSTS,
  ADD_FAQ_ANSWER,
  MAKE_PAYMENT,
} from 'constants/actionsConstant'
import {
  setIsFetchingCompany,
  setCompaniesList,
  setInvestCompaniesList,
  setCompanyById,
  setError404, isMoreCampaignsOnTheApi,
} from 'redux/actions/companies'
import {setShowSuccessfulInvestment} from '../actions/authPopupWindows';
import {getProfileFromApi} from './user'

import api from 'api'
import {getCompanyIdSelector} from '../reducers/companies';
import {getProfile, getUserIdSelector} from '../reducers/user';
import {setFaqPosts} from '../actions/companies';
import {isEmpty} from 'lodash'
import {setError} from '../actions/errors';
import {convertStatusToText} from '../../utils/utils';
import {getSelectedLangSelector} from '../reducers/language';

const { auth, companies } = api

function* getCompaniesHeaderListWorker() {
  try {
    yield put(setIsFetchingCompany(true))
    const { data } = yield call([companies, 'getCompaniesList'], '?view_on_investment_page_header=true')
    const language = yield select(getSelectedLangSelector)
    const _title = language === 'en'?'View this Campaign':'Se mer om kampanjen'
    const investCampaignList = data?.results?.map(el=>({
      id: el.id,
      status: convertStatusToText(el.status).toLowerCase(),
      title: el.investment_page_title,
      description: el.investment_page_description,
      image_list: el.header_image_list,
      first_button_title: _title,
      first_button_url: `/company/${el.id}`,
    }))
    yield put(setInvestCompaniesList(investCampaignList))

  } catch (error) {
    yield put(setError({status:error?.response?.status, data:error?.response?.data}))
  } finally {
    yield put(setIsFetchingCompany(false))
  }
}
////////////////////////////////////////////////////////////////////

function* getCompaniesListWorker({payload}) {
  try {
    yield put(setIsFetchingCompany(true))
    let filter = `?limit=9&offset=${payload.offset}`
    if(payload?.filter?.length>0){
      const params=payload?.filter.map(el=>`&status=${el}`).join('')
      filter= `?limit=9&offset=${payload.offset}${params}`
    }
    const { data } = yield call([companies, 'getCompaniesList'], filter)
    yield put(setCompaniesList(data?.results))
    yield put(isMoreCampaignsOnTheApi(data?.next))

  } catch (error) {
    yield put(setError({status:error?.response?.status, data:error?.response?.data}))
  } finally {
    yield put(setIsFetchingCompany(false))
  }
}



function* getCompanyByIdWorker({ payload }) {
  try {
    yield put(setIsFetchingCompany(true))
    const { data } = yield call([companies, 'one'], payload)
    yield put(setCompanyById(data))
  } catch (error) {
    yield put(setError({status:error?.response?.status, data:error?.response?.data}))
    if (error?.response?.status === 404 || error?.response?.status === 500) {
      yield put(setError404(true))
    }
  } finally {
    yield put(setIsFetchingCompany(false))
  }
}

function* addPost({ payload }) {
  try {
    yield put(setIsFetchingCompany(true))
    let campaignId = yield select(getCompanyIdSelector);
    let userId = yield select(getUserIdSelector)
    yield call([companies, 'addFaqPost'], {company: campaignId,user: userId, description: payload})
  } catch (error) {
    yield put(setError({status:error?.response?.status, data:error?.response?.data}))
  } finally {
    yield put(setIsFetchingCompany(false))
  }
}

function* addAnswer({ payload }) {
  try {
    yield put(setIsFetchingCompany(true))
    let campaignId = yield select(getCompanyIdSelector);
    let userId = yield select(getUserIdSelector)
    yield call([companies, 'addFaqPost'], {question:payload?.id,company: campaignId,user: userId, description: payload.post})
  } catch (error) {
    yield put(setError({status:error?.response?.status, data:error?.response?.data}))
  } finally {
    yield put(setIsFetchingCompany(false))
  }
}

function* getFaqPosts() {
  try {
    let campaignId = yield select(getCompanyIdSelector);
    if(campaignId){
      const response= yield call([companies, 'getFaqPosts'], campaignId)
      yield put(setFaqPosts(response.data))
    }
  } catch (error) {
    yield put(setError({status:error?.response?.status, data:error?.response?.data}))
  }
}

function* makePayment({payload}) {
  try {
    yield put(setIsFetchingCompany(true))
    let userId = yield select(getUserIdSelector)
    let campaignId = yield select(getCompanyIdSelector);
    let profile = yield select(getProfile)
    if(campaignId && userId){
      if(isEmpty(profile)){
        const res =  yield call([auth, 'createProfile'], payload.profile.profile)
        if(res.status === 201){
          yield call(getProfileFromApi)
          yield call([companies, 'makePayment'], {user:userId, company: campaignId, amount:payload.amount})
          yield put(setShowSuccessfulInvestment(true))
        }
      }else{
        yield call([companies, 'makePayment'], {user:userId, company: campaignId, amount:payload.amount})
        yield put(setShowSuccessfulInvestment(true))
      }
    }
  } catch (error) {
    yield put(setError({status:error?.response?.status, data:error?.response?.data}))
  } finally {
    yield put(setIsFetchingCompany(false))
  }
}


export function* companiesSagaWatcher() {
  yield takeEvery(GET_COMPANIES_LIST, getCompaniesListWorker)
  yield takeEvery(GET_COMPANY_BY_ID, getCompanyByIdWorker)
  yield takeEvery(GET_COMPANIES_HEADER_LIST, getCompaniesHeaderListWorker)
  yield takeEvery(ADD_POST, addPost)
  yield takeEvery(ADD_FAQ_ANSWER, addAnswer)
  yield takeEvery(GET_POSTS, getFaqPosts)
  yield takeEvery(MAKE_PAYMENT, makePayment)
}
