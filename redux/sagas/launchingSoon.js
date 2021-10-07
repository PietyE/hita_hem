import { takeEvery, call, put } from "redux-saga/effects";
import api from "api";
import { GET_LAUNCHING_SOON_POSTS } from "constants/actionsConstant";
import { setPosts, setIsFetchingLaunchingSoon } from "../actions/launchingSoon";
import { setError } from "../actions/errors";

const { launchingSoon } = api;

function* getPosts() {
  try {
    yield put(setIsFetchingLaunchingSoon(true));
    const response = yield call([launchingSoon, "getPosts"]);
    yield put(setPosts(response.data));
  } catch (error) {
    yield put(
      setError({ status: error?.response?.status, data: error?.response?.data })
    );
  } finally {
    yield put(setIsFetchingLaunchingSoon(false));
  }
}

export function* launchingSoonWatcher() {
  yield takeEvery(GET_LAUNCHING_SOON_POSTS, getPosts);
}
