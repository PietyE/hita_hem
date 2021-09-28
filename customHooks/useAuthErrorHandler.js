import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {
    getAuthEmailErrorSelector,
    getAuthPasswordErrorSelector,
    getAuthUserErrorSelector,
    getAuthOldPasswordErrorSelector,
    getAuthNewPassword1ErrorSelector,
    getAuthNewPassword2ErrorSelector,
} from '../redux/reducers/errors';
import {
    clearAuthEmailError, clearAuthPasswordError, clearAuthUserError, clearErrors,
    clearAuthOldPasswordError, clearAuthNewPassword1Error, clearAuthNewPassword2Error,
} from '../redux/actions/errors';

const useAuthErrorHandler = () => {
    const dispatch = useDispatch()

    const passwordError = useSelector(getAuthPasswordErrorSelector)
    const emailError = useSelector(getAuthEmailErrorSelector)
    const userError = useSelector(getAuthUserErrorSelector)
    const oldPasswordError = useSelector(getAuthOldPasswordErrorSelector)
    const newPassword1Error = useSelector(getAuthNewPassword1ErrorSelector)
    const newPassword2Error = useSelector(getAuthNewPassword2ErrorSelector)


    const _clearErrors = useCallback(
        () => {
            dispatch(clearErrors())
        },
        [dispatch]
    )

    const _clearAuthEmailError = useCallback(
        () => {
            dispatch(clearAuthEmailError())
        },
        [dispatch]
    )

    const _clearAuthPasswordError = useCallback(
        () => {
            dispatch(clearAuthPasswordError())
        },
        [dispatch]
    )

    const _clearAuthOldPasswordError = useCallback(
        () => {
            dispatch(clearAuthOldPasswordError())
        },
        [dispatch]
    )
    const _clearAuthNewPassword1Error = useCallback(
        () => {
            dispatch(clearAuthNewPassword1Error())
        },
        [dispatch]
    )
    const _clearAuthNewPassword2Error = useCallback(
        () => {
            dispatch(clearAuthNewPassword2Error())
        },
        [dispatch]
    )
    const _clearAuthUSerError = useCallback(
        () => {
            dispatch(clearAuthUserError())
        },
        [dispatch]
    )


    const clearAuthErrorFromApi = (error) => {
        switch (error) {
            case 'email':
                _clearAuthEmailError()
                _clearAuthUSerError()
                break
            case 'password':
                _clearAuthPasswordError()
                _clearAuthUSerError()
                break
            case 'old_password':
                _clearAuthPasswordError()
                _clearAuthUSerError()
                _clearAuthOldPasswordError()
                break
            case 'new_password1':
                _clearAuthPasswordError()
                _clearAuthUSerError()
                _clearAuthNewPassword1Error()
                break
            case 'new_password2':
                _clearAuthPasswordError()
                _clearAuthUSerError()
                _clearAuthNewPassword2Error()
                break
            default:
                return null
        }
    }

    return {
        clearAuthErrorFromApi, _clearErrors, passwordError, emailError, userError,
        oldPasswordError, newPassword1Error, newPassword2Error
    }
}
export default useAuthErrorHandler;