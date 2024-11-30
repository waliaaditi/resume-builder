import Resume from "../Models/ResumeModel.js";
import User from "../Models/UserModel.js";

const createResume=async(req,res)=>{
    const resumeData = req.body;
    console.log(resumeData);
    try {
        const newResume = new Resume({user:req.user._id, ...resumeData})
        console.log(newResume);
        const savedResume = await newResume.save();
         res.status(201).json(savedResume);
        // res.status(200).json('data has been successfully sent')
    } catch (error) {
        console.error("Error saving resume:", error);
        res.status(500).json({ message: "Failed to save resume", error: error.message });
    }
}
const getResumes=async(req,res)=>{
    try {
        const resumes=await Resume.find({user:req.user._id});
        res.status(200).json(resumes);
    } catch (error) {
        console.log("Error in getting resume",error);
        res.status(500).json({message:"Failed to fetch resume",error:error.message})
    }
}
const getResumeById = async (req, res) => {
    const { resumeId } = req.body;
    console.log(resumeId);
    try {
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.status(200).json(resume);
    } catch (error) {
        console.log("Error in getting resume by ID", error);
        res.status(500).json({ message: "Failed to fetch resume by ID", error: error.message });
    }
};
export {createResume,getResumes,getResumeById};