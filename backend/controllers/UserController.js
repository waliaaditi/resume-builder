import User from '../Models/UserModel.js';
const updateUser = async (req, res) => {
    try {
        const {name } = req.body;
        const user = await User.findOne({_id:req.user._id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (name) user.name = name;
        const updatedUser = await user.save();
        console.log('updateUser',updatedUser);
        return res.status(200).json({
            id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
        });
    } catch (error) {
        console.error(`Error in updateUser: ${error.message}`);
        return res.status(500).json({ error: "Failed to update user. Please try again later." });
    }
};
const signupUser = async (req, res) => {
    try {
        console.log("i am inside sign up user");
        const { token, email, displayName } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(500).json({ error: "User Already Exists" });
        }

        const newUser = await User.create({ email, name: displayName });

        if (newUser) {
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
                sameSite: "lax",
            });
            return res.status(200).json({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            });
        } else {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (error) {
        console.error(`Error in signupUser: ${error.message}`);
        return res.status(500).json({ error: "Failed to signup. Please try again later." });
    }
};

const loginUser = async (req, res) => {
    try {
        const { token, email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid Email" });
        }

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
            sameSite: "strict",
        });

        return res.status(200).json({
            id: user._id,
            email: user.email,
            name: user.name
        });
    } catch (error) {
        console.error(`Error in loginUser: ${error.message}`);
        return res.status(500).json({ error: "Failed to login. Please try again later." });
    }
};

const logout = async (req, res) => {
    try {
        console.log("i am inside logout");
        res.cookie("jwt", "", { maxAge: 1 }); // Clear JWT token from cookie
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(`Error in logout: ${error.message}`);
        return res.status(500).json({ error: "Failed to logout. Please try again later." });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(`Error in getUserByEmail: ${error.message}`);
        return res.status(500).json({ error: "Failed to fetch user. Please try again later." });
    }
};
export { signupUser, loginUser, logout, getUserByEmail ,updateUser};
