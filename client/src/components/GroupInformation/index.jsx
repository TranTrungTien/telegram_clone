import "./group-information.css";
import { useContext } from "react";
import axios from "../../Utils/axiosConfig";
import { ConversationContext } from "../../context/conversationContext";

const GroupInformation = ({ conversation, user, handleOpenGroup }) => {
  const { setConversation } = useContext(ConversationContext);
  console.log({ conversation });
  const onCloseGroupInfo = () => {
    if (handleOpenGroup) {
      handleOpenGroup((pre) => !pre);
    }
  };

  const onChangeGroupImage = async (e) => {
    const formData = new FormData();
    formData.append(
      conversation?.conversationName + "-image cover",
      e.target.files[0]
    );

    try {
      const response = await axios.patch(
        process.env.REACT_APP_SERVER_URL +
          "/conversations/updateConversationImg/" +
          conversation?._id +
          "/" +
          user?._id,
        formData,
        {
          headers: {
            "Content-Types": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        setConversation(response.data?.doc);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onGetID = () => {
    document.querySelector("#conversation_id").value = conversation?._id;
  };
  return (
    <div
      id="transparent-scrollbar"
      style={{ minWidth: "413px" }}
      className="flex flex-col justify-start items-start max-w-full bg-color_212121"
    >
      <div className="sticky top-0 right-0 flex justify-start items-center px-6 py-2 bg-color_212121 w-full space-x-5">
        <button
          className="px-3 py-1 hover:bg-color_2b2b2b rounded-full text-color_707579 text-xl"
          onClick={onCloseGroupInfo}
        >
          <i className="fas fa-times"></i>
        </button>
        <div>
          <h3 className="text-color_c5c5c5 font-semibold text-xl">Profile</h3>
        </div>
      </div>
      <div
        style={{ height: "calc(100vh - 51px)", overflow: "overlay" }}
        className="flex flex-col justify-start items-start w-full overflow-x-hidden overflow-y-scroll"
      >
        <div className="w-full">
          <div className="">
            {conversation?.imgUrl ? (
              <div className="max-w-full h-400">
                <img
                  src={conversation?.imgUrl}
                  alt="group"
                  className="w-full h-full object-cover object-center rounded"
                />
              </div>
            ) : (
              <div className="max-w-full h-400 relative bg-blue-500">
                <h1 className="font-bold text-2xl text-white text-center">
                  {conversation?.conversationName}
                </h1>
                {conversation?.admin === user?._id && (
                  <>
                    <label
                      htmlFor="upload-photo"
                      className="absolute top-0 left-0 w-full h-full z-10 text-7xl text-white flex justify-center items-center cursor-pointer"
                    >
                      <i className="fas fa-camera-retro"></i>
                    </label>
                    <input
                      type="file"
                      name="group-image"
                      id="upload-photo"
                      className="absolute top-0 left-0 w-full h-full -z-10 invisible opacity-0"
                      onChange={onChangeGroupImage}
                    />
                  </>
                )}
              </div>
            )}
            <div className="p-2">
              <div className="hover:bg-color_2b2b2b p-5 text-color_f8f8f8 rounded-md">
                Description :
                <p className="text-sm text-gray-400 font-light">
                  {conversation?.description ? (
                    conversation?.description
                  ) : (
                    <>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ducimus voluptatem vitae quia, amet in itaque? Quis fuga
                      laboriosam mollitia id magnam nostrum consequatur adipisci
                      quisquam, quod nesciunt voluptas minus corporis.
                    </>
                  )}
                </p>
              </div>
              {conversation?.admin === user?._id && (
                <div className="w-full flex justify-center items-center space-x-3">
                  <input
                    type="text"
                    name="group-desc"
                    placeholder="Add your description"
                    className="w-full h-full focus:outline-none border-none px-3 py-2 rounded"
                  />
                  <button className="px-5 py-2 rounded-md bg-green-700 text-white font-semibold">
                    Save
                  </button>
                </div>
              )}
            </div>
            <div>
              {conversation?.admin === user?._id && (
                <div className="flex justify-center items-center space-x-2 p-1">
                  <button
                    onClick={onGetID}
                    className="flex-1 px-2 py-px font-semibold text-white bg-transparent border border-color_8774e1 rounded"
                  >
                    Get Conversation ID
                  </button>
                  <input
                    type="text"
                    id="conversation_id"
                    disabled={true}
                    defaultValue="Your ID"
                    className="px-3 py-1 h-full focus:outline border-none bg-transparent text-sm font-semibold text-white"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="border-b border-gray-900 px-3">
              <ul className="flex justify-center items-center font-semibold text-color_707579">
                <li className="flex-1 text-center hover:bg-color_2b2b2b py-3 px-1 rounded">
                  Members
                </li>
                <li className="flex-1 text-center hover:bg-color_2b2b2b py-3 px-1 rounded">
                  Media
                </li>
                <li className="flex-1 text-center hover:bg-color_2b2b2b py-3 px-1 rounded">
                  Files
                </li>
                <li className="flex-1 text-center hover:bg-color_2b2b2b py-3 px-1 rounded">
                  Links
                </li>
                <li className="flex-1 text-center hover:bg-color_2b2b2b py-3 px-1 rounded">
                  Music
                </li>
              </ul>
            </div>
            <div className="w-full">
              <ul className="p-3">
                <li className="w-full px-2 py-3 rounded-md hover:bg-color_2b2b2b">
                  <div className="flex justify-start items-center space-x-2">
                    <div className="w-12 h-12">
                      <img
                        src="https://i.pinimg.com/originals/83/d3/6e/83d36e8ccbdde7e4ab3c9f64eb0f6b07.jpg"
                        alt="member"
                        className="w-full h-full object-cover object-center rounded-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <div>
                        <h3 className="font-semibold text-color_f8f8f8">
                          Tran Trung Tien
                        </h3>
                      </div>
                      <div>
                        <span className="text-sm font-normal text-color_707579">
                          Online
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="w-full px-2 py-3 rounded-md hover:bg-color_2b2b2b">
                  <div className="flex justify-start items-center space-x-2">
                    <div className="w-12 h-12">
                      <img
                        src="https://i.pinimg.com/originals/83/d3/6e/83d36e8ccbdde7e4ab3c9f64eb0f6b07.jpg"
                        alt="member"
                        className="w-full h-full object-cover object-center rounded-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <div>
                        <h3 className="font-semibold text-color_f8f8f8">
                          Tran Trung Tien
                        </h3>
                      </div>
                      <div>
                        <span className="text-sm font-normal text-color_707579">
                          Online
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="w-full px-2 py-3 rounded-md hover:bg-color_2b2b2b">
                  <div className="flex justify-start items-center space-x-2">
                    <div className="w-12 h-12">
                      <img
                        src="https://i.pinimg.com/originals/83/d3/6e/83d36e8ccbdde7e4ab3c9f64eb0f6b07.jpg"
                        alt="member"
                        className="w-full h-full object-cover object-center rounded-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <div>
                        <h3 className="font-semibold text-color_f8f8f8">
                          Tran Trung Tien
                        </h3>
                      </div>
                      <div>
                        <span className="text-sm font-normal text-color_707579">
                          Online
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupInformation;
