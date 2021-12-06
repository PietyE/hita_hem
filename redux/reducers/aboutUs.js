import {
  SET_ABOUT_US,
  SET_EMAIL,
  SET_IS_FETCHING_ABOUT_US,
} from "constants/actionsConstant";

const initialState = {
  aboutUsContent: {
    header_description: "",
    header_image: "",
    header_image_list: [],
    images: [],
    header_title: "",
    pk: "",
    name: "",
    subscribe_title: "",
    flat_blocks: [],
    team_members: [],
  },
  isFetching: false,
};

// export const getAboutUsContentSelector = (state) => state.aboutUs.aboutUsContent
const sortedByIndex = (data = []) => data.sort((a, b) => a.index - b.index);

export const getHeaderDescriptionSelector = (state) =>
  state.aboutUs.aboutUsContent.header_description;
export const getHeaderImageSelector = (state) =>state.aboutUs.aboutUsContent.images
////////////////////////////////////////////////////

export const getHeaderTitleSelector = (state) =>
  state.aboutUs.aboutUsContent.header_title;
export const getSubscribeTitleSelector = (state) =>
  state.aboutUs.aboutUsContent.subscribe_title;
export const getFlatBlocksSelector = (state) =>
  sortedByIndex(state.aboutUs.aboutUsContent.flat_blocks);
export const getTeamMembersSelector = (state) =>
  sortedByIndex(state.aboutUs.aboutUsContent.team_members);

export const getIsFetchingAboutUsSelector = (state) => state.aboutUs.isFetching;

export const aboutUs = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_ABOUT_US:
      return { ...state, aboutUsContent: actions.payload };
    case SET_EMAIL:
      return { ...state, email: actions.payload };
    case SET_IS_FETCHING_ABOUT_US:
      return { ...state, isFetching: actions.payload };
    default:
      return state;
  }
};
