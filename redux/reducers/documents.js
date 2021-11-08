import { SET_DOCUMENTS } from "constants/actionsConstant";

const initialState = {
  documents: [],
};

export const getDocumentsSelector = (state) => state.documents.documents;
export const getDocumentUrl = (state) =>
  state.documents.documents[0]?.file || state.documents.documents[0]?.url;
export const getPrivacyPolicyDocument = (state) =>
  state.documents.documents?.find(
    (document) => document.name === "Privacy Policy"
  );

export const getMembershipAgreementDocument = (state) =>
    state.documents.documents?.find(
        (document) => document.name === "Membership Agreement"
    );



export const documents = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_DOCUMENTS:
      return { ...state, documents: actions.payload };
    default:
      return state;
  }
};
