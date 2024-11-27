import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PasswordContext = createContext();
export const usePasswordContext = () => useContext(PasswordContext);

export const PasswordProvider = ({ children }) => {
  //  main functionality

  //  state for managing all data of password
  const [allpassworddata, setallpassworddata] = useState([]);
  // state for post password data
  const [passworddata, setpassworddata] = useState({
    title: "",
    password: "",
  });

  const Postpassword = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:8000/pwm/api/password/postpassword",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      let postdata = res?.data;
      console.log(postdata);

      if (postdata?.success) {
        toast.success(postdata?.message)
        let maindata = postdata?.data;
        setallpassworddata([...allpassworddata, maindata]);
        setpassworddata({
          title: "",
          password: "",
        });
      } else {
        toast.error(postdata?.message)
   
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Getpassword = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/pwm/api/password/getpassword",

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      let getdata = res?.data;
      console.log(getdata.data);

      if (getdata?.success) {
        console.log(getdata.message);

        setallpassworddata([...allpassworddata, ...getdata.data]);
      } else {
        console.log(getdata.message);
      }
    } catch (error) {}
  };

  const Deletepassword = async (pwid) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/pwm/api/password/deletepassword/${pwid}`,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      let deletdata = res?.data;
      console.log(deletdata);

      if (deletdata?.success) {
       
        toast.success(deletdata?.message)
        let newdata = allpassworddata?.filter((value) => value?._id !== pwid);
        setallpassworddata(newdata);
      } else {
        toast.error(deletdata?.message)
       
      }
    } catch (error) {}
  };

  const Updatepassword = async ({ prevvalue, newpwddata }) => {
    console.log(prevvalue, newpwddata);
    try {
      const res = await axios.put(
        `http://localhost:8000/pwm/api/password/updatepassword/${prevvalue?._id}`,
        newpwddata,

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      let updatedata = res?.data;
      console.log(updatedata);

      if (updatedata?.success) {
        toast.success(updatedata?.message)
        let index = allpassworddata.indexOf(prevvalue);
        if (updatedata?.data) {
          allpassworddata.splice(index - 1, 0, updatedata.data);
        }
      } else {
        console.log(updatedata.message);
        toast.error(updatedata?.message)
      }
    } catch (error) {
      console.log(error);
      
    }
  };


  const LogoutUser=async()=>{
    try {
      
      const res=await axios.get("http://localhost:8000/pwm/api/user/logout",{
        headers:{
          "auth-token":localStorage.getItem("token")
        }
      })
      const logout=res.data;

      if(logout?.success){
        localStorage.clear()
        console.log(logout?.message)
        toast.success(logout?.message)
        window.location.href="/login"
      }else{
        console.log(logout?.message)
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <PasswordContext.Provider
      value={{
        passworddata,
        setpassworddata,
        Postpassword,
        allpassworddata,
        Getpassword,
        Deletepassword,
        Updatepassword,
        LogoutUser
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};
