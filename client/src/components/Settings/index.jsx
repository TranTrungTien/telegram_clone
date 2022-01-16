import { useState, useContext } from "react";
import axios from "../../Utils/axiosConfig";
import { UserContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Settings = ({ handleCloseSettings }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
  const onCloseSettings = () => {
    if (handleCloseSettings) {
      handleCloseSettings(false);
    }
  };
  const onChangeFileProfile = async (e) => {
    const formData = new FormData();
    formData.append(user?.username + "-profile", e.target.files[0]);

    try {
      const response = await axios.patch(
        process.env.REACT_APP_SERVER_URL + "/users/update-profile/" + user?._id,
        formData,
        {
          headers: {
            "Content-Types": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        setUser(response.data.doc);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="w-full h-screen space-y-8">
      <div className="flex justify-between items-center px-5 py-2 border-b border-color_8774e1">
        <div>
          <button
            onClick={onCloseSettings}
            className="px-3 py-1 rounded-full hover:bg-color_2b2b2b text-2xl text-gray-500 hover:text-gray-200 border-b border-color_8774e1 filter"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setOpenLogoutPopup(!openLogoutPopup)}
            className="px-4 py-1 rounded-full hover:bg-color_2b2b2b text-2xl text-gray-500 hover:text-gray-200"
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
          {openLogoutPopup && (
            <div className="absolute top-full right-5">
              <button
                onClick={onLogout}
                className="px-8 py-3 rounded bg-color_2b2b2b font-semibold text-gray-500 hover:text-gray-200 border border-color_8774e1"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="space-y-8">
          <div className="flex flex-col justify-center items-center space-y-2">
            {user?.profileImgUrl ? (
              <div className="w-32 h-32 relative cursor-pointer">
                <img
                  src={user?.profileImgUrl}
                  alt="Profile"
                  className="w-full h-full object-cover object-center  rounded-full"
                />
                <input
                  type="file"
                  name="profile-image"
                  className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                  onChange={onChangeFileProfile}
                />
              </div>
            ) : (
              <div className="w-32 h-32 grid place-content-center bg-color_8774e1 rounded-full relative cursor-pointer">
                <h1 className="text-3xl text-gray-100 font-semibold">
                  {user?.username[0] + user?.username[1]}
                </h1>
                <input
                  type="file"
                  name="profile-image"
                  className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                  onChange={onChangeFileProfile}
                />
              </div>
            )}
            <div>
              <h2 className="text-gray-300 font-medium text-lg">
                {user?.username}
              </h2>
            </div>
          </div>
          <ul className="w-full px-5">
            <li className="px-4 py-3 rounded hover:bg-color_2b2b2b text-gray-400 hover:text-gray-300 font-semibold cursor-pointer">
              Edit Profile
            </li>
            <li className="px-4 py-3 rounded hover:bg-color_2b2b2b text-gray-400 hover:text-gray-300 font-semibold cursor-pointer">
              Chat Folders
            </li>
            <li className="px-4 py-3 rounded hover:bg-color_2b2b2b text-gray-400 hover:text-gray-300 font-semibold cursor-pointer">
              General Settings
            </li>
            <li className="px-4 py-3 rounded hover:bg-color_2b2b2b text-gray-400 hover:text-gray-300 font-semibold cursor-pointer">
              Notification and Sounds
            </li>
            <li className="px-4 py-3 rounded hover:bg-color_2b2b2b text-gray-400 hover:text-gray-300 font-semibold cursor-pointer">
              Privacy and Security
            </li>
            <li className="px-4 py-3 rounded hover:bg-color_2b2b2b text-gray-400 hover:text-gray-300 font-semibold cursor-pointer">
              Language
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
