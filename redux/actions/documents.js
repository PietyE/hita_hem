import {GET_DOCUMENTS,SET_DOCUMENTS} from 'constants/actionsConstant';

export const getDocuments = () => ({
    type: GET_DOCUMENTS,
})

export const setDocuments = (payload) => ({
    type: SET_DOCUMENTS,
    payload,
})


