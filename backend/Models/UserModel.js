import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(value) {
              // Regular expression for email validation
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
          }
    },
    // password:{
    //     type:String,
    //     required:true,
    //     inlength: [6, 'Password must be at least 6 characters long']
    // },
    profilePic:{
        type:String,
    },
    PhoneNumber:{
        type:String,
    }
},
    {
        timestamps: true
    });
const User=mongoose.model('User',userSchema);
export default User;