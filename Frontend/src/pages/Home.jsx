import React, { useEffect, useState } from "react";
import Passworditem from "../components/Passworditem";
import { usePasswordContext } from "../Context/PasswordContext";
const Home = () => {

  // state post the password data 
  const {passworddata,setpassworddata,allpassworddata,Postpassword,Getpassword,LogoutUser}=usePasswordContext();

  console.log(allpassworddata)
  const HanldeSubmit=(e)=>{
    e.preventDefault();
    Postpassword(passworddata)


  }

  const HanldeLogut=()=>{
    LogoutUser()
  }

  useEffect(()=>{
Getpassword()
  },[])

  return (
    <>
      <section className="min-h-screen w-full bg-gray-200 p-5 sm:p-3 ">
        <div className="flex justify-between items-center gap-2  px-2">
        <h1 className="text-xl"><span className="text-red-600">Important Note :</span> Store Your important password for your important accounts </h1>

        <button onClick={HanldeLogut} className="p-1 px-2 bg-red-600  rounded-md text-white font-semibold ">Logout</button>

        </div>
        {/*  form title or password  */}

        <form 
         onSubmit={HanldeSubmit}
        action="" className="   w-full lg:w-1/2 mx-auto lg:transition-transform duration-200 mt-5 ease-in-out lg:hover:scale-105 bg-yellow-400 flex gap-2 flex-col p-5 rounded-sm shadow-sm">
          <label htmlFor="title"  className="text-base text-gray-600 ">Title</label>
          <input
            type="text"
            value={passworddata?.title}
            required
            onChange={(e)=>setpassworddata({...passworddata,title:e.target.value})}
            placeholder="Enter your title"
            id="title"
            name="title"
            className=" p-2  rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="Password"  className="text-base text-gray-600 ">Password</label>
          <input
            type="text"
            placeholder="Enter your Password"
            required
            id="Password"
            value={passworddata?.password}
            onChange={(e)=>setpassworddata({...passworddata,password:e.target.value})}
            name="Password"
                        className=" p-2  rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button  className="p-2 rounded-md  transition-transform duration-200 ease-in-out hover:scale-105 bg-red-600 text-white font-semibold w-full  sm:w-1/4 mx-auto mt-3">Add Password</button>
        </form>





        {/* section  which store our password  */}
        <section className="mt-5  grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allpassworddata && allpassworddata?.length>0 &&  allpassworddata?.map((value)=>(
            <Passworditem key={value?._id} value={value}/>

          ))}
          {/* <Passworditem/>
          <Passworditem/>
          <Passworditem/>
          <Passworditem/>
          <Passworditem/> */}

        </section>
      </section>
    </>
  );
};

export default Home;
