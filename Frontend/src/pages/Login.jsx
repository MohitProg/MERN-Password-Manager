import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {
  const Navigate=useNavigate()
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("email", user?.email);
    formdata.append("password", user?.password);

    try {
      const res = await axios.post(
        "http://localhost:8000/pwm/api/user/login",
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = res?.data;
      console.log(data);

      if (data?.success) {
        toast.success(data?.message)
        localStorage.setItem("token", data?.data?.refreshtoken);
        localStorage.setItem("userid", data?.data?._id);
    Navigate("/")

        setuser({
          email: "",
          password: "",
        });
      } else {

        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="flex items-center justify-center p-5 min-h-screen">
        <form
          action=""
          onSubmit={HandleSubmit}
          className=" w-full  sm:w-1/2 lg:w-1/3  mx-auto transition-transform duration-200 mt-5 ease-in-out hover:scale-105 bg-yellow-400 flex gap-2 flex-col p-5 rounded-sm shadow-sm"
        >
          <h1 className="text-2xl text-black text-center  font-semibold ">
            Welcome Back
          </h1>
          <label htmlFor="title" className="text-base text-gray-600 ">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            id="email"
            name="email"
            value={user?.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
            className=" p-2  rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="Password" className="text-base text-gray-600 ">
            Password
          </label>
          <input
            type="text"
            placeholder="Enter your Password"
            id="Password"
            name="Password"
            value={user?.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            className=" p-2  rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button className="p-2 rounded-md  transition-transform duration-200 ease-in-out hover:scale-105 bg-red-600 text-white font-semibold w-1/4 mx-auto mt-3">
            Login
          </button>

          <div>
            <p className="text-gray-500">
              do not have account?
              <Link to={"/singup"} className="text-red-600">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
