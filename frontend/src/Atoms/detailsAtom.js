import { atom } from "recoil";
const detailsAtom=atom({
    key:'detailsAtom',
    default: {
        firstName: "",
        lastName: "",
        job: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        email: "",
        linkedin: "",
      },
})
export default detailsAtom