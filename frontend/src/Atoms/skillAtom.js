import { atom } from "recoil";
const skillAtom=atom({
    key:'skillAtom',
    default:[{
        skillName:"",
    }]
})
export default skillAtom