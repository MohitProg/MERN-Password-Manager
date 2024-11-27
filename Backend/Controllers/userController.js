import bcryptjs from "bcryptjs";
import UserModel from "../Modals/userModal.js";
import userModal from "../Modals/userModal.js";
import jwt from "jsonwebtoken";

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ success: false, message: "Please fill all the field" });
    }

    //   check user exist or not
    const existuser = await userModal.findOne({ email });

    if (!existuser) {
      return res.send({ success: false, message: "user  does not exist  " });
    }

    //  campare pasword
    const comparepassword = await bcryptjs.compare(
      password,
      existuser.password
    );
    console.log(comparepassword);
    if (!comparepassword) {
      return res.send({ success: false, message: "password is incorrect " });
    }

    const token = jwt.sign({ _id: existuser?._id }, "helloworldhowareyou");
    if (!token) {
      return res.send({ success: false, message: "invalid token " });
    }

    existuser.refreshtoken = token;
    existuser.save({ validateBeforeSave: true });

    return res.send({
      success: true,
      data: existuser,
      message: "login successfully",
    });
  } catch (error) {
    console.log(error);

    return res.send({ success: false, message: error.message });
  }
};

// sigup user
export const SignupUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send({ success: false, message: "Please fill all the field" });
    }

    // check exitance  of user

    const existuser = await userModal.findOne({ email });
    if (existuser) {
      return res.send({ success: false, message: "user already exist " });
    }

    // hasing password
    const hashpassowrd = await bcryptjs.hash(password, 10);

    // save user

    const newuser = new userModal({
      name,
      password: hashpassowrd,
      email,
    });

    await newuser.save();

    // generate token
    const token = jwt.sign({ _id: newuser?._id }, "helloworldhowareyou");
    if (!token) {
      return res.send({ success: false, message: "invalid token " });
    }
    newuser.refreshtoken = token;
    newuser.save({ validateBeforeSave: true });

    return res.send({
      success: true,
      data: newuser,
      message: "user registered successfully ",
    });
  } catch (error) {
    console.log(error);

    return res.send({ success: false, message: error.message });
  }
};

export const Logout = async (req, res) => {
  const userid = req.user?._id;
  console.log(userid)
  try {
    await userModal.findByIdAndUpdate(
      {_id: userid },
      {
        $set: {
          refreshtoken: null,
        },
      }
    );

    return res.send({
      success: true,

      message: "user Logout successfully ",
    });
  } catch (error) {
    console.log(error);

    return res.send({ success: false, message: error.message });
  }
};
