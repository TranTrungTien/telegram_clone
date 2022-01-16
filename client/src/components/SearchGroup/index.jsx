import React, { useState, useContext } from "react";
import axios from "../../Utils/axiosConfig";
import { UserContext } from "../../context/authContext";
import { ConversationContext } from "../../context/conversationContext";

const SearchGroup = () => {
  const { user, setUser } = useContext(UserContext);
  const { setConversation } = useContext(ConversationContext);
  const [openSearch, setOpenSearch] = useState(false);
  const [groupResult, setGroupResult] = useState(null);

  const onSearch = () => {
    setOpenSearch(!openSearch);
    if (groupResult) {
      setGroupResult(null);
    }
  };

  const onJoinGroup = async () => {
    const response = await axios.patch(
      process.env.REACT_APP_SERVER_URL +
        "/conversations/add_new_user/" +
        groupResult._id,
      { newUser: user?._id }
    );
    if (response.data.doc) {
      await axios.patch(
        process.env.REACT_APP_SERVER_URL + "/users/update/" + user?._id,
        { newConversation: groupResult._id },
        {
          headers: {
            "Content-Types": "application/json",
          },
        }
      );

      const userRes = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/users",
        {
          headers: {
            "Content-Types": "application/json",
          },
        }
      );
      setUser(userRes.data);
      if (setConversation) {
        setConversation(response.data.doc);
      }
    }
    setGroupResult(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const key = e.target.search_group.value;
    console.log({ key });
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/conversations/" + key,
        {
          headers: {
            "Content-Types": "application/json",
          },
        }
      );
      if (response.data) {
        setGroupResult(response.data?.result);
      } else {
        setGroupResult({});
      }
      console.log("groups : ", response.data.result);
    } catch (error) {
      console.log({ error });
      setGroupResult({});
    }
  };

  return (
    <div className="flex justify-center items-center relative">
      {openSearch && (
        <form onSubmit={onSubmit} autoComplete="off">
          <input
            type="text"
            name="search_group"
            className="focus:outline-none border-none rounded-sm w-full h-full text-sm px-3 py-1 text-gray-100 bg-color_181818 focus:bg-color_181818"
            placeholder="Enter ID Conversation"
          />
        </form>
      )}
      <button
        onClick={onSearch}
        className="grid place-content-center w-9 h-9 rounded-full hover:bg-color_2b2b2b cursor-pointer"
      >
        <i className="fas fa-search"></i>
      </button>
      {groupResult &&
        (Object.entries(groupResult).length ? (
          <div className="absolute top-full right-0 flex justify-center items-center space-x-2 px-5 py-2 rounded-md bg-color_707579 text-gray-900 cursor-default max-w-xs text-sm">
            {groupResult?.imgUrl ? (
              <div className="w-10 h-10">
                <img
                  src={groupResult.imgUrl}
                  alt="searchGroup"
                  className="w-full h-full object-cover object-center rounded"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-blue-700 rounded-full"></div>
            )}
            <div className="flex-1 min-w-0 overflow-hidden truncate flex-shrink-0">
              <h3 className="">{groupResult?.conversationName}</h3>
            </div>
            <button
              onClick={onJoinGroup}
              className="hover:text-black font-semibold"
            >
              Join
            </button>
          </div>
        ) : typeof groupResult === "object" ? (
          <div className="absolute top-full right-0 flex justify-center items-center space-x-2 px-5 py-2 rounded-md bg-color_707579 text-gray-900 cursor-default max-w-xs text-sm">
            No Conversation
          </div>
        ) : (
          ""
        ))}
    </div>
  );
};

export default SearchGroup;
