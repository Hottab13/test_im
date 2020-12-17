import { BaseThunkActionType, InferActionType } from "./ReduxStore";
import { userAPI } from "../api/api";
import { ProcessList } from "../components/types/type";

let initionalState = {
  processList: [] as Array<ProcessList>,
  isFetching: false as boolean, //prelouder
  followingInProgress: [] as Array<number>, //arrey of process
};

export type InitionalStateType = typeof initionalState;
type ActionType = InferActionType<typeof action>;
type ThunkActionType = BaseThunkActionType<ActionType>;

const processListReducer = (
  state = initionalState,
  action: ActionType
): InitionalStateType => {
  switch (action.type) {
    case "SET_PROCESS_LIST": {
      return { ...state, processList: action.processList };
    }
    /*case "TOGGLE_IS_FETING":{
            return { ...state, isFetching:action.isFeting}
            }   */
    case "TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFeting
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

export const action = {
  setUsers: (processList: Array<ProcessList>) =>
    ({ type: "SET_PROCESS_LIST", processList } as const),
  setCurrentPage: (setCurrentPage: number) =>
    ({ type: "SET_CURRENT_PAGE", setCurrentPage } as const),
  setTotalCount: (count: number) =>
    ({ type: "SET_TOTAL_COUNT", count } as const),
  toggleIsFeting: (isFeting: boolean) =>
    ({ type: "TOGGLE_IS_FETING", isFeting } as const),
  toggleIsFollowingProgress: (isFeting: boolean, userId: number) =>
    ({ type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFeting, userId } as const),
};

export const getProcessListThunkCreator = (): ThunkActionType => async (
  dispatch,
  getState
) => {
  dispatch(action.toggleIsFeting(true));
  let respons = await userAPI.getProcessList();
  dispatch(action.toggleIsFeting(false));
  if (respons.processList) {
    dispatch(action.setUsers(respons.processList));
  } else {
    //dispatch(stopSubmit('login',{_error:respons.err}));
  }
};

export default processListReducer;
