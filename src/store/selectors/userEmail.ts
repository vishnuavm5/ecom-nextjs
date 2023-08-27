import { userAtom } from "../atom/userAtom";
import { selector } from "recoil";

export const userFullName = selector({
  key: "userFullName",
  get: ({ get }) => {
    const state = get(userAtom);
    return state.fullName;
  },
});
