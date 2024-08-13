import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateProfileImage } from "../../Services/AuthService";
import { message } from "antd";

const ProfileOverview = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const { user } = useSelector((state) => state.auth);
  const [openEditProfileImageDialog, setOpenEditProfileImageDialog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", user?._id);
      const res = await updateProfileImage(formData);
      message.success(res.data.message);
      dispatch({ type: "SETUSER", payload: res.data.user });
      setOpenEditProfileImageDialog(false);
    }
  };
  return (
    <>
      <div className="col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>

          {/* Profile Image Section */}
          <div className="mb-4 flex items-center space-x-4">
            {user?.profileImage ? (
              <img
                src={user?.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <CircleUser />
            )}
            <div>
              <p className="text-gray-700">
                <strong>{user?.name}</strong>
              </p>
              <Button
                to="/profile/settings"
                variant="outline"
                className="text-blue-500 hover:underline"
                onClick={() => {
                  setOpenEditProfileImageDialog(true);
                }}
              >
                Change Profile Picture
              </Button>
            </div>
          </div>

          {/* User Information */}
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Name:</strong> {user?.name}
            </p>
            <p className="text-gray-700">
              <strong>Account Type:</strong> {user?.role}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user?.email}
            </p>
          </div>

          {/* Additional User Info */}
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Joined on:</strong> {new Date(user?.createdAt).toLocaleDateString()}
            </p>
            {/* Add more fields as needed */}
          </div>

          <Link to="settings" className="text-blue-500 hover:underline">
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Update Image */}
      {openEditProfileImageDialog && (
        <div className="flex items-center justify-center h-[100vh] fixed top-0 bg-white w-full left-0">
          <Button
            className="absolute top-[1rem] left-[1rem]"
            onClick={() => {
              setOpenEditProfileImageDialog(false);
            }}
          >
            X
          </Button>
          <form onSubmit={handleSubmit}>
            <Input type="file" onChange={handleFileChange} />
            <Button className="mt-3" type="submit">
              Upload Image
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ProfileOverview;
