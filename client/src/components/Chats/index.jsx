import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/authContext";
import { CommentContext } from "../../context/commentContext";
import { ConversationContext } from "../../context/conversationContext";
import ReplyCommentContextProvider from "../../context/replyComment";
import socket from "../../Utils/connectSocket";
import ChatArea from "../ChatArea";
import ChatHeader from "../ChatHeader";
import ChatInput from "../ChatInput";
import GroupInformation from "../GroupInformation";

const Chats = () => {
  const { user } = useContext(UserContext);
  const { setComments } = useContext(CommentContext);

  const { conversation } = useContext(ConversationContext);
  console.log({ conversation });

  const [openInfoGroup, setOpenInfoGroup] = useState(false);

  useEffect(() => {
    console.log("useEffect chat run ...");

    socket.on("connect_error", (err) => {
      console.log("Connect Error : ", err);
    });

    socket.on("receive-message", (data) => {
      console.log("receive message :", data);
      if (user._id === data?.user?._id) {
        return;
      } else {
        if (setComments) {
          setComments((preCmt) => [...preCmt, ...[data]]);
        }
      }
    });
  }, [setComments, user?._id]);

  useEffect(() => {
    if (
      Array.isArray(user?.conversationList) &&
      user?.conversationList?.length &&
      socket.connected
    ) {
      const conversationListId = [];
      user.conversationList.forEach((conversation) => {
        conversationListId.push(conversation._id);
      });
      console.log({ conversationListId });
      socket.emit("join-rooms", conversationListId);
    }
  }, [user?.conversationList]);

  return (
    <main className="flex-3 max-h-screen h-screen flex min-w-0">
      {Object.entries(conversation).length ? (
        <>
          <div className="relative flex-1">
            <ChatHeader
              handleOpenGroupInfo={setOpenInfoGroup}
              conversation={conversation}
            />
            <ReplyCommentContextProvider>
              <ChatArea conversation={conversation} />
              <div className="w-full absolute bottom-2 left-0 z-50 flex justify-center items-center">
                <ChatInput />
              </div>
            </ReplyCommentContextProvider>
          </div>
          <div
            className={`${
              openInfoGroup ? "w-35%" : "w-0%"
            } transition-all duration-500`}
          >
            {openInfoGroup ? (
              <GroupInformation
                conversation={conversation}
                handleOpenGroup={setOpenInfoGroup}
                user={user}
              />
            ) : (
              <div className="w-full bg-color_212121 h-screen"></div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-color_0f0f0f flex justify-center items-center">
          <h1 className="text-white text-2xl">Choose your conversation</h1>
        </div>
      )}
    </main>
  );
};

export default Chats;
