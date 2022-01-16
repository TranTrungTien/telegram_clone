import axios from "../../Utils/axiosConfig";
import { useState } from "react";

const CreateGroup = ({ user }) => {
  const [showCreateGroupBtn, setShowCreateGroupBtn] = useState(false);

  const onShowCreateGroup = () => {
    setShowCreateGroupBtn(!showCreateGroupBtn);
  };

  const onSubmitCreateGroup = async (e) => {
    console.log("value : ", e.target.groupName.value);
    e.preventDefault();
    if (!e.target.groupName.value) {
      return;
    } else {
      try {
        const { data } = await axios.post(
          "/conversations/" + user._id,
          { conversationName: e.target.groupName.value },
          {
            headers: {
              "Content-Types": "application/json",
            },
          }
        );
        console.log({ data });
        const updatedUser = await axios.patch(
          "/users/update/" + user._id,
          { newConversation: data?.conversation?._id },
          {
            headers: {
              "Content-Types": "application/json",
            },
          }
        );
        console.log("update conversation : ", updatedUser.data);
      } catch (error) {
        console.log({ error });
      }
    }
  };
  return (
    <div className="absolute bottom-6 right-6 cursor-pointer flex justify-center items-center space-x-2">
      {showCreateGroupBtn ? (
        <div className="">
          <form onSubmit={onSubmitCreateGroup} autoComplete="off">
            <input
              type="text"
              name="groupName"
              placeholder="Create Group Name"
              required={true}
              className="w-full h-full px-3 py-1 rounded-sm focus:outline-none text-sm text-gray-900"
            />
          </form>
        </div>
      ) : (
        ""
      )}
      <button
        onClick={onShowCreateGroup}
        className="py-4 px-5 rounded-full text-gray-200 bg-color_8774e1"
      >
        <i className="fas fa-pencil-alt"></i>
      </button>
    </div>
  );
};

export default CreateGroup;
