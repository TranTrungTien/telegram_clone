import { ConversationContext } from "../../context/conversationContext";
import { useContext } from "react";

const Group = ({ con }) => {
  const { conversation, setConversation } = useContext(ConversationContext);
  const onOpenGroup = () => {
    if (setConversation) {
      if (con?._id !== conversation?._id) setConversation(con);
    }
  };
  return (
    <div
      onClick={onOpenGroup}
      className="w-full flex justify-start items-center space-x-2 px-2 py-3 hover:bg-color_2b2b2b cursor-pointer rounded overflow-x-hidden text-color_f8f8f8 font-medium text-base"
    >
      <div className="w-14 h-14">
        {con?.imgUrl ? (
          <img
            src={con?.imgUrl}
            alt="group"
            className="w-full h-full object-cover object-center rounded-full"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full object-cover object-center rounded-full bg-blue-600">
            <h1>{con?.conversationName[0]}</h1>
          </div>
        )}
      </div>
      <div className="flex flex-col item-start justify-center flex-1 min-w-0">
        <div className="flex justify-between items-center min-w-0 space-x-1">
          <h4 className="truncate">{con.conversationName}</h4>
          <div className="w-max flex-shrink-0">
            <span className="text-xs font-light text-color_aaaaaa">11:00</span>
          </div>
        </div>
        <div className="flex justify-between items-center min-w-0 space-x-1">
          <div className="flex items-center justify-start min-w-0 space-x-1">
            <h4 className="w-max font-normal">Author: </h4>
            <p className="truncate text-color_707579">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              commodi corrupti maxime distinctio consectetur, nulla ipsa
              aspernatur neque ex tenetur reprehenderit numquam dicta at animi
              alias laudantium natus illo facere?
            </p>
          </div>
          <div className="w-max flex-shrink-0">
            <span className="inline-block px-3 py-px rounded-full bg-color_8774e1 text-sm font-semibold">
              111111
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
