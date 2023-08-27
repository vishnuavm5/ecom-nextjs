import { userAtom } from "../atom/userAtom";
import { selector } from "recoil";

export const userId = selector({
  key: "userId",
  get: ({ get }) => {
    const state = get(userAtom);
    return state.id;
  },
});
