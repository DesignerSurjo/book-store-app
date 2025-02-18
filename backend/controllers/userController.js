import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }
        // const isMatch = await bcrypt.compare(password, user.password)
        // if (isMatch) {
        //     const token = createToken(user._id)
        //     res.json({ success: true, token })
        // } else {
        //     return res.json({ success: false, message: "Invalid credentials" })
        // }

        if (password === user.password) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //checking user already exist or not
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: "User already exists" })

        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })

        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // //hashing password
        // const salt = await bcrypt.genSalt(10)
        // const hashedpassword = await bcrypt.hash(password, salt)

        // const newUser = new userModel({
        //     name,
        //     email,
        //     password: hashedpassword
        // })

        const newUser = new userModel({
            name,
            email,
            password // Plain Password Saved
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}


const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, { password: 1, name: 1, email: 1 }); // Password সহ সব তথ্য
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { loginUser, registerUser, adminLogin, getAllUsers, deleteUser }