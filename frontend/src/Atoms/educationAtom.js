import { atom } from 'recoil';
const educationAtom = atom({
  key: 'educationAtom',
  default: [
    {
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      degree: "",
      fieldOfStudy:"",
      description: ""
    }
  ]
});
export default educationAtom;
