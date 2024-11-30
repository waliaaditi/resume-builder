import { atom } from "recoil";
const projectsAtom=atom({
    key:'projectsAtom',
    default:[{
        projectName:'',
        projectDescription:'',
    }]
})
export default projectsAtom