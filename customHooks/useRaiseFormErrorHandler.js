import {useCallback} from 'react'
import {clearErrors} from 'redux/actions/errors'
import {useDispatch, useSelector} from 'react-redux'

import {getRaiseFirstNameErrorSelector,
    getRaiseSecondNameErrorSelector,
    getRaiseEmailErrorSelector,
    getRaisePhoneSelector,
    getRaiseCountrySelector,
} from 'redux/reducers/errors'

import {setRaiseFirstNameError,
        setRaiseSecondNameError,
        setRaiseEmailError,
        setRaisePhoneError,
        setRaiseCountryError,
} from 'redux/actions/errors';


const useRaiseFormErrorHandler = () => {
    const dispatch = useDispatch()

    const firstNameError = useSelector(getRaiseFirstNameErrorSelector)
    const secondNameError = useSelector(getRaiseSecondNameErrorSelector)
    const emailNameError = useSelector(getRaiseEmailErrorSelector)
    const phoneError = useSelector(getRaisePhoneSelector)
    const countryError = useSelector(getRaiseCountrySelector)

    const _clearErrors = useCallback(
        () => {
            dispatch(clearErrors())
        },
        [dispatch]
    )
    const _setRaiseFirstNameError = useCallback(
        () => {
            dispatch(setRaiseFirstNameError())
        },
        [dispatch]
    )
    const _setRaiseSecondNameError = useCallback(
        () => {
            dispatch(setRaiseSecondNameError())
        },
        [dispatch]
    )
    const _setRaiseEmailError = useCallback(
        () => {
            dispatch(setRaiseEmailError())
        },
        [dispatch]
    )
    const _setRaisePhoneError = useCallback(
        () => {
            dispatch(setRaisePhoneError())
        },
        [dispatch]
    )
    const _setRaiseCountryError = useCallback(
        () => {
            dispatch(setRaiseCountryError())
        },
        [dispatch]
    )

    const clearRaiseFormErrorFromApi = (error) => {
        switch (error) {
            case 'first_name':
                _setRaiseFirstNameError()
                break
            case 'second_name':
                _setRaiseSecondNameError()
                break
            case 'email':
                _setRaiseEmailError()
                break
            case 'phone':
                _setRaisePhoneError()
                break
            case 'country':
                _setRaiseCountryError()
                break
            default:
                return null
        }
    }
    return {clearRaiseFormErrorFromApi,
        _clearErrors,
        firstNameError,
        secondNameError,
        emailNameError,
        phoneError,
        countryError,
    }
}

export default useRaiseFormErrorHandler;