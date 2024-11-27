import passwordModel from "../Modals/passModal.js";

export const Getpassword = async (req, res) => {
  const userid = req.user?._id;
  try {
    const allpassword = await passwordModel.find({ Author: userid });
    return res.send({
      success: true,
      data: allpassword,
      message: "get all password",
    });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: error.message });
  }
};

export const PostPassword = async (req, res) => {
  const userid = req.user?._id;
  const { title, password } = req.body;
  try {
    if (!title || !password) {
      return res.send({ success: false, message: "please fill all field" });
    }

    const newpassword = new passwordModel({
      title,
      password,
      Author: userid,
    });

    await newpassword.save();

    return res.send({
      success: true,
      data: newpassword,
      message: "password save successfully",
    });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: error.message });
  }
};

export const DeletePassword = async (req, res) => {
  const userid = req.user?._id;
  const pwid = req.params.id;
  try {
    await passwordModel.findOneAndDelete({ _id:pwid, Author: userid });
    return res.send({
      success: true,
   
      message: "password delete successfully",
    });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: error.message });
  }
};

export const UpdatePassword = async (req, res) => {
  const userid = req.user?._id;
  const pwid = req.params.id;
  const { title, password } = req.body;
  console.log(req.body)

  try {
    if (!title || !password) {
      return res.send({ success: false, message: "please fill all field" });
    }

    const updatepassword = await passwordModel.findOneAndUpdate(
      { _id: pwid, Author: userid },
      {
        $set: {
          title,
          password,
        },
      },
      { new: true }
    );

    return res.send({
      success: true,
      data: updatepassword,
      message: "password update successfully",
    });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: error.message });
  }
};
