import SearchGroup from "../SearchGroup";

const ChatHeader = ({ conversation, handleOpenGroupInfo }) => {
  console.log({ conversation });
  const onOpenInfo = () => {
    if (handleOpenGroupInfo) {
      console.log("clicked");
      handleOpenGroupInfo(conversation);
    }
  };

  return (
    <div className="px-7 py-1 flex justify-between items-center w-full bg-color_212121 sticky top-0">
      <div
        className="flex justify-start items-center space-x-3 cursor-pointer"
        onClick={onOpenInfo}
      >
        <div className="w-10 h-10">
          {conversation?.imgUrl ? (
            <img
              src={conversation?.imgUrl}
              alt="Group"
              className="w-full h-full object-cover object-center rounded-full"
            />
          ) : (
            <div className="w-ful h-full rounded-full  bg-blue-700 flex justify-center items-center">
              <h1 className="text-white">
                {conversation?.conversationName?.[0] +
                  conversation?.conversationName?.[1]}
              </h1>
            </div>
          )}
        </div>
        <div className=" flex flex-col justify-center items-start text-base text-color_f8f8f8 font-semibold min-w-0">
          <h4 className="truncate">{conversation?.conversationName}</h4>
          <span className="text-sm text-color_707579 font-normal">
            {Array.isArray(conversation?.usersList)
              ? conversation?.usersList?.length
              : "0"}{" "}
            Members
          </span>
        </div>
      </div>
      <div className="flex justify-start items-center space-x-3 cursor-pointer text-lg text-color_aaaaaa">
        <div className="w-9 h-9">
          <img
            src="https://e7.pngegg.com/pngimages/137/543/png-clipart-heart-drawing-cartoon-big-red-heart-love-heart-thumbnail.png"
            alt="Group"
            className="w-full h-full object-cover object-center rounded-md"
          />
        </div>
        <div className="flex flex-col items-start justify-center text-sm text-color_c5c5c5">
          <span className="font-semibold text-color_8774e1">Pined Message</span>
          <p className="">Content message</p>
        </div>
        <div>
          <button className="grid place-content-center w-9 h-9 rounded-full hover:bg-color_2b2b2b cursor-pointer">
            <i className="fas fa-thumbtack"></i>
          </button>
        </div>
        <SearchGroup />
        <div>
          <button className="grid place-content-center w-9 h-9 rounded-full hover:bg-color_2b2b2b cursor-pointer">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
