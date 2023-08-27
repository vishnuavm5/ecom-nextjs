import { signinParams } from "@/Validations/validation";
import { useReducer } from "react";

export const INITIAL_STATE: signinParams = {
  email: "",
  password: "",
};

export const loginReducer = (state: any, action: any) => {
  switch (action.type) {
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
};
