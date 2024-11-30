import { atom } from "recoil";

const summaryAtom=atom({
    key:'summaryAtom',
    default:{
        summary:'',
    }
});
export default summaryAtom;