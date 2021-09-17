import { SET_LANGUAGE, CHANGE_LANGUAGE } from 'constants/actionsConstant'

export const setSelectedLanguage = (payload) => ({
  type: SET_LANGUAGE,
  payload,
})

export const changeLanguage = (payload) => ({
  type: CHANGE_LANGUAGE,
  payload,
})
