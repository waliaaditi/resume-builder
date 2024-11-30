import { atom, useRecoilState } from 'recoil';

// Define the atom for storing input data
const professionalAtom = atom({
  key: 'professionalAtom',
  default: [{
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    workSummary: ""
  }]
});
export default professionalAtom;