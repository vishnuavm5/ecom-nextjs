import { atom } from "recoil";

interface userdata {
  fullName: string | null;
  isSeller: boolean;
  email: string | null;
  id: string | null;
}

export const userAtom = atom<userdata>({
  key: "userAtom",
  default: {
    fullName: null,
    isSeller: false,
    email: null,
    id: null,
  },
});
