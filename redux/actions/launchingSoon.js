import {GET_LAUNCHING_SOON_POSTS, SET_IS_FETCHING_LAUNCHING_SOON, SET_LAUNCHING_SOON_POSTS} from 'constants/actionsConstant'

export const getPosts = (payload) => ({
    type: GET_LAUNCHING_SOON_POSTS,
    payload,
})

export const setPosts = (payload) => ({
    type: SET_LAUNCHING_SOON_POSTS,
    payload,
})

export const setIsFetchingLaunchingSoon = (payload) => ({
    type: SET_IS_FETCHING_LAUNCHING_SOON,
    payload,
})