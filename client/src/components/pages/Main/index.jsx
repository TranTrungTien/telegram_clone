import { memo } from "react";
import SideBar from "../../SideBar";
import Chats from "../../Chats";
import CommentContextProvider from "../../../context/commentContext";
import ConversationContextProvider from "../../../context/conversationContext";

const Main = () => {
  return (
    <div className="flex flex-nowrap items-start justify-start w-screen max-h-full min-h-full h-full overflow-hidden">
      <ConversationContextProvider>
        <SideBar />
        <CommentContextProvider>
          <Chats />
        </CommentContextProvider>
      </ConversationContextProvider>
    </div>
  );
};

export default memo(Main);
