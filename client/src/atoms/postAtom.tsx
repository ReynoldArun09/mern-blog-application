import { postType } from "@/utils/types";
import { atom } from "recoil";



export const postAtom = atom<postType[]>({
  key: "postState",
  default: [],
});
