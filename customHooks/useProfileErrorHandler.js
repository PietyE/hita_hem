import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {
    getFirstNameErrorSelector,
    getSecondNameErrorSelector,
    getDateOfBirthErrorSelector,
    getCountryErrorSelector,
    getCityErrorSelector,
    getAddressErrorSelector,
    getPersonalIdErrorSelector,
    getPhoneErrorSelector,
} from '../redux/reducers/errors';
import {
    setFirstNameError, setSecondNameError, setDateOfBirthError, setCountryError,
    setCityError, setAddressError, setPersonalIdError, setPhoneError, clearErrors,
} from '../redux/actions/errors';

const useProfileErrorHandler = () => {
    const dispatch = useDispatch()

    const firstNameError = useSelector(getFirstNameErrorSelector)
    const secondNameError = useSelector(getSecondNameErrorSelector)
    const dateOfBirthError = useSelector(getDateOfBirthErrorSelector)
    const countryError = useSelector(getCountryErrorSelector)
    const cityError = useSelector(getCityErrorSelector)
    const addressError = useSelector(getAddressErrorSelector)
    const personalIdError = useSelector(getPersonalIdErrorSelector)
    const phoneError = useSelector(getPhoneErrorSelector)

    const _clearErrors = useCallback(
        () => {
            dispatch(clearErrors())
        },
        [dispatch]
    )

    const _setFirstNameError = useCallback(
        () => {
            dispatch(setFirstNameError())
        },
        [dispatch]
    )
    const _setSecondNameError = useCallback(
        () => {
            dispatch(setSecondNameError())
        },
        [dispatch]
    )
    const _setDateOfBirthError = useCallback(
        () => {
            dispatch(setDateOfBirthError())
        },
        [dispatch]
    )
    const _setCountryError = useCallback(
        () => {
            dispatch(setCountryError())
        },
        [dispatch]
    )
    const _setCityError = useCallback(
        () => {
            dispatch(setCityError())
        },
        [dispatch]
    )
    const _setAddressError = useCallback(
        () => {
            dispatch(setAddressError())
        },
        [dispatch]
    )
    const _setPersonalIdError = useCallback(
        () => {
            dispatch(setPersonalIdError())
        },
        [dispatch]
    )
    const _setPhoneError = useCallback(
        () => {
            dispatch(setPhoneError())
        },
        [dispatch]
    )
    const clearProfileErrorFromApi = (error) => {
        switch (error) {
            case 'first_name':
                _setFirstNameError()
                break
            case 'second_name':
                _setSecondNameError()
                break
            case 'dateOfBirthError':
                _setDateOfBirthError()
                break
            case 'address.country':
                _setCountryError()
                break
            case 'address.city':
                _setCityError()
                break
            case 'address.address':
                _setAddressError()
                break
            case 'personal_id':
                _setPersonalIdError()
                break
            case 'phone_number':
                _setPhoneError()
                break
            default:
                return null
        }
    }
    return {clearProfileErrorFromApi, _clearErrors, firstNameError, secondNameError,
        dateOfBirthError, countryError, cityError, addressError, personalIdError, phoneError}
}




export default useProfileErrorHandler;