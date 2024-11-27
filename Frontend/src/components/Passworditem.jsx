import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { usePasswordContext } from "../Context/PasswordContext";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import moment from "moment";
const Passworditem = ({ value }) => {
  //  state for toggle view password

  const [viewpwd, setviewpwd] = useState(false);
  // state for handling update password data

  const [updatepwd, setupdatepwd] = useState({
    id: "",
    bol: false,
  });

  // state for updating password
  const [newpwddata, setnewpwddata] = useState({
    title: value?.title,
    password: value?.password,
  });

  console.log(updatepwd);

  const { Deletepassword,Updatepassword } = usePasswordContext();

  const HanldeDelete = (pwid) => {
    let confrm = confirm("Do you want to delete");
    if (confrm) {
      Deletepassword(pwid);
    }
  };


  const HandleUpdate=(data)=>{
    Updatepassword({prevvalue:data,newpwddata})
    setupdatepwd({
      id: "",
      bol: false,
    })
    

  }

  return (
    <>
      <div className="flex flex-col gap-3   transition-transform hover:scale-95 duration-150 ease-in bg-white p-5  rounded-md shadow-sm">
        <input
          type="text"
          className="ring-1 ring-gray-500 rounded-md  p-1"
          placeholder="enter your title"
          disabled={updatepwd?.bol ? false : true}
          onChange={(e) =>
            setnewpwddata({ ...newpwddata, title: e.target.value })
          }
          value={newpwddata?.title}
        />
        <div className="w-full relative">
          <input
            type={viewpwd ? "text" : "password"}
            className="ring-1 ring-gray-500 rounded-md w-full  p-1"
            disabled={updatepwd?.bol ? false : true}
            placeholder="enter your password"
            onChange={(e) =>
              setnewpwddata({ ...newpwddata, password: e.target.value })
            }
            value={newpwddata?.password}
          />
          {viewpwd ? (
            <RemoveRedEyeIcon
              onClick={() => setviewpwd(!viewpwd)}
              fontSize="small"
              className="absolute top-2 right-2 "
            />
          ) : (
            <VisibilityOffIcon
              onClick={() => setviewpwd(!viewpwd)}
              fontSize="small"
              className="absolute top-2 right-2 "
            />
          )}
        </div>

        {updatepwd?.bol ? (
          <div className="flex items-center justify-end gap-2">
            <button
              className="p-1 bg-gray-300 text-base rounded-md"
              onClick={() =>
                setupdatepwd({
                  id: "",
                  bol: false,
                })
              }
            >
              Cancel
            </button>
            <button
              className="p-1 bg-yellow-300  text-base rounded-md"
              onClick={()=>HandleUpdate(value)}
            >
              Update
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-1">
            <h1 className=" flex items-center justify-center gap-2 text-gray-600">
              Date :- <span>{moment(value?.createdAt).fromNow()}</span>
            </h1>
            <button
              onClick={() =>
                setupdatepwd({ bol: !updatepwd?.bol, id: value?._id })
              }
              className="text-green-500 transition-colors duration-200 ease-in-out p-2 flex items-center justify-center hover:bg-black rounded-full hover:text-white"
            >
              <EditIcon fontSize="small" />
            </button>
            <button
              onClick={() => HanldeDelete(value?._id)}
              className="text-red-500 transition-colors duration-200 ease-in-out p-2 flex items-center justify-center hover:bg-black rounded-full hover:text-white"
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Passworditem;
