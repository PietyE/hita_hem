import {useCallback} from 'react'
import {clearErrors} from 'redux/actions/errors'
import {useDispatch, useSelector} from 'react-redux'

import {getRaiseWebsiteSelector,
    getRaiseVideoPreviewSelector,
    getRaiseSocialsOneSelector,
    getRaiseSocialsTwoSelector,
    getRaiseSocialsThreeSelector,
    getRaiseFollowersOneSelector,
    getRaiseFollowersTwoSelector,
    getRaiseFollowersThreeSelector,
} from 'redux/reducers/errors'

import {setRaiseWebsiteError,
    setRaiseVideoPreviewError,
    setRaiseSocialOneError,
    setRaiseSocialTwoError,
    setRaiseSocialThreeError,
    setRaiseFollowersOneError,
    setRaiseFollowersTwoError,
    setRaiseFollowersThreeError,


} from 'redux/actions/errors';


const useRaiseForm3ErrorHandler = () => {
    const dispatch = useDispatch()

    const websiteError = useSelector(getRaiseWebsiteSelector)
    const videoPreviewError = useSelector(getRaiseVideoPreviewSelector)
    const socialsOneError = useSelector(getRaiseSocialsOneSelector)
    const socialsTwoError = useSelector(getRaiseSocialsTwoSelector)
    const socialsThreeError = useSelector(getRaiseSocialsThreeSelector)
    const followersOneError = useSelector(getRaiseFollowersOneSelector)
    const followersTwoError = useSelector(getRaiseFollowersTwoSelector)
    const followersThreeError = useSelector(getRaiseFollowersThreeSelector)

    const _clearErrors = useCallback(
        () => {
            dispatch(clearErrors())
        },
        [dispatch]
    )
    const _setRaiseWebsiteError = useCallback(
        () => {
            dispatch(setRaiseWebsiteError())
        },
        [dispatch]
    )
    const _setRaiseVideoPreviewError = useCallback(
        () => {
            dispatch(setRaiseVideoPreviewError())
        },
        [dispatch]
    )
    const _setRaiseSocialOneError = useCallback(
        () => {
            dispatch(setRaiseSocialOneError())
        },
        [dispatch]
    )
    const _setRaiseSocialTwoError = useCallback(
        () => {
            dispatch(setRaiseSocialTwoError())
        },
        [dispatch]
    )
    const _setRaiseSocialThreeError = useCallback(
        () => {
            dispatch(setRaiseSocialThreeError())
        },
        [dispatch]
    )
    const _setRaiseFollowersOneError = useCallback(
        () => {
            dispatch(setRaiseFollowersOneError())
        },
        [dispatch]
    )
    const _setRaiseFollowersTwoError = useCallback(
        () => {
            dispatch(setRaiseFollowersTwoError())
        },
        [dispatch]
    )
    const _setRaiseFollowersThreeError = useCallback(
        () => {
            dispatch(setRaiseFollowersThreeError())
        },
        [dispatch]
    )
    const clearRaiseFormErrorFromApi = (error) => {
        switch (error) {
            case 'website':
                _setRaiseWebsiteError()
                break
            case 'video_preview':
                _setRaiseVideoPreviewError()
                break
            case 'social_one':
                _setRaiseSocialOneError()
                break
            case 'social_two':
                _setRaiseSocialTwoError()
                break
            case 'social_three':
                _setRaiseSocialThreeError()
                break
            case 'followers_count_one':
                _setRaiseFollowersOneError()
                break
            case 'followers_count_two':
                _setRaiseFollowersTwoError()
                break
            case 'followers_count_three':
                _setRaiseFollowersThreeError()
                break

            default:
                return null
        }
    }
    return {clearRaiseFormErrorFromApi,
        _clearErrors,
        websiteError,
        videoPreviewError,
        socialsOneError,
        socialsTwoError,
        socialsThreeError,
        followersOneError,
        followersTwoError,
        followersThreeError,



    }
}

export default useRaiseForm3ErrorHandler;