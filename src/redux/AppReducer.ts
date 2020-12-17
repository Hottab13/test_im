import { InferActionType, BaseThunkActionType } from "./ReduxStore";
import { loginUser } from "./AuthReducer";
import { FormAction } from "redux-form";

let initionalState = {
  initionalized: false as boolean,
};
type ActionType = InferActionType<typeof actions>;
export type initionalStateType = typeof initionalState;
type ThunkActionType = BaseThunkActionType<ActionType | FormAction>;

const appReducer = (
  state = initionalState,
  action: ActionType
): initionalStateType => {
  switch (action.type) {
    case "INITIONALIZED_SUCCESS":
      return {
        ...state,
        initionalized: true,
      };
    default:
      return state;
  }
};

const actions = {
  initionalizedSuccess: () => ({ type: "INITIONALIZED_SUCCESS" } as const),
};

export const initiolizeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(loginUser);
    Promise.all([promise]).then(() => {
      dispatch(actions.initionalizedSuccess());
    });
  };
};
export default appReducer;
