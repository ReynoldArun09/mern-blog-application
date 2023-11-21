import { ValueType } from "@/utils/types";
import { atom } from "recoil";



export const authAtom = atom<ValueType>({
  key: "authState",
  default: {
    isLogged: null,
  },
});
