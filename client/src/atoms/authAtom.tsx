import {atom} from 'recoil'

export type UserType = {
    username: string;
    userId: string;
    token: string;
  };
  
  export type ValueType = {
    isLogged: null | UserType;
  };

export const authAtom = atom<ValueType>({
    key: 'authState',
    default: {
        isLogged: null,
    }
})