import User from "../modal/userModal.js";
import mailer from "./mailer.js";
import bcrypt from "bcrypt";

export const userRegistrationController = async (request, response) => {
    const { name, email, password, confirmPassword, contact, address, location } = request.body;

    if (!name || !email || !password || !confirmPassword || !contact || !address || !location) {
        return response.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return response.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return response.status(400).json({ message: 'Email already registered' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, contact, address, location });
        await newUser.save();
        response.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
}

export const userOTPLoginController = async (request, response) => {
    try {

        const { email } = request.body;
        var data = await User.findOne({ email: email });
        // console.log("======= ",data._id.toString());
        if (data) {
            mailer(email, (status, otp) => {
                if (status) {
                    console.log("email send")
                    console.log("otp : " + otp);
                    request.session.userId = data._id.toString();
                    // console.log("userId in sesstion -->",request.session.userId);
                    response.status(201).json({ status: true, otp: otp,msg:"Login sucessfully!" });
                } else {
                    console.log("Error in user OTP generation : ")
                    response.status(500).json({ status: false });
                }
            });
        } else {
            console.log("OTP not snd......!! ")
            response.status(501).json({ status: false, msg: "Register first" });
        }
    } catch (error) {
        console.error("Error in user OTP generation controller: ", error);
        response.status(500).json({ status: false });
    }
}


export const forgetPassOtpController = async (request, response) => {
    try {
        const { email } = request.body;
        var data = await User.findOne({ email: email });
        if (data) {
            mailer(email, (status, Rotp) => {
                if (status) {
                    console.log("email send")
                    console.log("otp : " + Rotp);
                    response.status(201).json({ status: true, Rotp: Rotp });
                } else {
                    console.log("Error in user OTP generation : ")
                    response.status(500).json({ status: false });
                }
            });
        }
        else {
            console.log("email does not exist......!! ")
            response.status(201).json({ status: false ,msg:"Email does not exist Register First"});
        }
    } catch (error) {
        console.error("Error in user OTP generation controller: ", error);
        response.status(500).json({ status: false });
    }
}

export const resetPasswordController = async (request, response) => {
    try {
        const { forgetemail, resetPass } = request.body;
        var data = await User.updateOne({ email: forgetemail }, {
            $set: {
                password: await bcrypt.hash(resetPass, 10)
            }
        });
        response.status(201).json({ message: "password update successfully", data: data })
    } catch (error) {
        response.status(500).json({ message: "password not update successfully" })
    }
}

export const userLogOutController = (request, response) => {
    request.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return response.status(500).json({ message: 'Logout failed' });
        }
        response.status(200).json({ message: 'Logout successful' });
    });
};

