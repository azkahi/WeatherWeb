import { atom } from "recoil";

export const appearanceState = atom({
    key: 'isDarkMode',
    default: false,
});