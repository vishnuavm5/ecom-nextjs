import { userAtom } from "../atom/userAtom";
import { selector } from "recoil";

export const isSeller = selector({
  key: "isSeller",
  get: ({ get }) => {
    const state = get(userAtom);
    return state.isSeller;
  },
});
