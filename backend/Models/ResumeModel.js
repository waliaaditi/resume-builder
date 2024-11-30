import mongoose from "mongoose";
const educationSchema = mongoose.Schema({
    school: {
        type: String,
    },
    location: String,
    startDate:String,
    endDate:String,
    degree:String,
    fieldOfStudy:String,
    description:String
});

const experienceSchema = mongoose.Schema({
    title: {
        type: String
    },
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    workSummary: [String]
});

const skillSchema=mongoose.Schema({
    skillName:String
})
const projectSchema = mongoose.Schema({
    projectName: {
        type: String,
    },
    projectDescription:String
});


const resumeSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    fileName:{
        type:String,
    },
    template:{
        type:String,
    },
    name: {
        type: String,
        required: true
    },
    job:{
        type:String
    },
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    email: String,
    linkedin: String,
    summary:{
        type:String
    },
    education: [educationSchema], // Use educationSchema as an array
    experience: [experienceSchema], // Use experienceSchema as an array
    skills:[skillSchema],
    projects: [projectSchema],
}, {
    timestamps: true
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
