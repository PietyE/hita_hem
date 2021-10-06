import {useCallback} from 'react'
import {clearErrors} from 'redux/actions/errors'
import {useDispatch, useSelector} from 'react-redux'

import {getRaiseCompanyNameSelector,
    getRaiseCompanyFormSelector,
    getRaiseRoleSelector,
    getRaiseSharePriceSelector,
    getRaiseRevenueSelector,
    getRaiseAmountSelector,
} from 'redux/reducers/errors'

import {setRaiseCompanyNameError,
    setRaiseCompanyFormError,
    setRaiseRoleError,
    setRaiseSharePriceError,
    setRaiseRevenueError,
    setRaiseAmountError,
} from 'redux/actions/errors';


const useRaiseForm2ErrorHandler = () => {
    const dispatch = useDispatch()

    const companyNameError = useSelector(getRaiseCompanyNameSelector)
    const companyFormError = useSelector(getRaiseCompanyFormSelector)
    const roleError = useSelector(getRaiseRoleSelector)
    const sharePriceError = useSelector(getRaiseSharePriceSelector)
    const revenueError = useSelector(getRaiseRevenueSelector)
    const amountError = useSelector(getRaiseAmountSelector)

    const _clearErrors = useCallback(
        () => {
            dispatch(clearErrors())
        },
        [dispatch]
    )

    const _setRaiseCompanyNameError = useCallback(
        () => {
            dispatch(setRaiseCompanyNameError())
        },
        [dispatch]
    )
    const _setRaiseCompanyFormError = useCallback(
        () => {
            dispatch(setRaiseCompanyFormError())
        },
        [dispatch]
    )
    const _setRaiseRoleError = useCallback(
        () => {
            dispatch(setRaiseRoleError())
        },
        [dispatch]
    )
    const _setRaiseSharePriceError = useCallback(
        () => {
            dispatch(setRaiseSharePriceError())
        },
        [dispatch]
    )
    const _setRaiseRevenueError = useCallback(
        () => {
            dispatch(setRaiseRevenueError())
        },
        [dispatch]
    )
    const _setRaiseAmountError = useCallback(
        () => {
            dispatch(setRaiseAmountError())
        },
        [dispatch]
    )

    const clearRaiseFormErrorFromApi = (error) => {
        switch (error) {

            case 'company_name':
                _setRaiseCompanyNameError()
                break
            case 'company_form':
                _setRaiseCompanyFormError()
                break
            case 'role':
                _setRaiseRoleError()
                break
            case 'share_price':
                _setRaiseSharePriceError()
                break
            case 'revenue':
                _setRaiseRevenueError()
                break
            case 'amount':
                _setRaiseAmountError()
                break
            default:
                return null
        }
    }
    return {clearRaiseFormErrorFromApi,
        _clearErrors,
        companyNameError,
        companyFormError,
        roleError,
        sharePriceError,
        revenueError,
        amountError,
    }
}

export default useRaiseForm2ErrorHandler;