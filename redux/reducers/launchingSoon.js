import {
  SET_IS_FETCHING_LAUNCHING_SOON,
  SET_LAUNCHING_SOON_POSTS,
} from "constants/actionsConstant";
import { chooseCorrectResolution } from "../../utils/utils";

const initialsState = {
  launchingSoonContent: {
    title: "",
    description: "",
    image: null,
    image_list: [],
    sub_title: "",
    post_set: [],
  },
  isFetching: false,
};

export const launchingSoon = (state = initialsState, actions) => {
  switch (actions.type) {
    case SET_LAUNCHING_SOON_POSTS:
      return { ...state, launchingSoonContent: actions.payload };
    case SET_IS_FETCHING_LAUNCHING_SOON:
      return { ...state, isFetching: actions.payload };
    default:
      return state;
  }
};

const sortedByIndex = (data) => data.sort((a, b) => a.index - b.index);

export const getMainTitleSelector = (state) =>
  state.launchingSoon.launchingSoonContent.title;
export const getMainDescriptionSelector = (state) =>
  state.launchingSoon.launchingSoonContent.description;
// export const getMainImageSelector = (state) =>
//   chooseCorrectResolution(state.launchingSoon.launchingSoonContent.image_list);
export const getMainImageSelector = (state) =>state.launchingSoon.launchingSoonContent.image;
////////////////////////////////////////////////////////////////////
export const getMainSubTitleSelector = (state) =>
  state.launchingSoon.launchingSoonContent.sub_title;
export const getMainPostsSelector = (state) =>
  sortedByIndex(state.launchingSoon.launchingSoonContent.post_set);
export const getIsFetchingLaunchingSoonSelector = (state) =>
  state.launchingSoon.isFetching;
