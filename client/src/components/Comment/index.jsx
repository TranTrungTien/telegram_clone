import { memo, useContext } from "react";
import { ReplyCommentContext } from "../../context/replyComment";
import Attachments from "../Attachments";
import axios from "../../Utils/axiosConfig";

import "./comment.css";

const ImageProfile = ({ profileImgUrl, username }) => {
  return (
    <div>
      <div className="w-12 h-12 cursor-pointer">
        {profileImgUrl ? (
          <img
            src={profileImgUrl}
            alt="user wrapper"
            className="w-full h-full object-cover object-center rounded-full"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-pink-800 flex justify-center items-center">
            <h1 className="font-semibold text-white">
              {username && username[0] + username[1]}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

const Comment = ({ comment, user, isBlock }) => {
  console.log("comment re-render");
  const { setReplyComment } = useContext(ReplyCommentContext);
  console.log({ comment });
  const date = new Date(comment?.updatedAt);

  const onReplyCmt = () => {
    if (setReplyComment) {
      setReplyComment(comment);
    }
  };
  const onBlockUser = async () => {
    console.log("user id : ", user?._id);
    console.log("comment user id : ", comment?.user?._id);
    if (user?._id === comment?.user?._id) {
      return;
    } else {
      try {
        await axios.patch(
          process.env.REACT_APP_SERVER_URL +
            "/users/update-blocklist/" +
            user._id,
          { blockUserId: comment?.user?._id },
          {
            headers: {
              "Content-Types": "application/json",
            },
          }
        );
      } catch (error) {
        console.log({ error });
      }
    }
  };
  return (
    <div className="flex justify-start space-x-3 items-center overflow-hidden group">
      <div className="flex justify-start items-end space-x-5">
        <ImageProfile
          profileImgUrl={comment?.user?.profileImgUrl}
          username={comment?.user?.username}
        />
        <div className="flex flex-col item-start justify-end min-w-0">
          {!isBlock && (comment?.attachmentsLength || comment?.attachment) && (
            <Attachments
              attachments={comment?.attachment}
              attachmentsLength={comment?.attachmentsLength}
              messageId={comment?._id}
            />
          )}
          <div
            id="comment"
            className="bg-color_212121 relative  rounded-t-xl rounded-br-xl min-w-0 max-w-max "
          >
            <div className="p-2 pr-12 w-full">
              <div className="text-pink-700 font-medium">
                <h3>{comment?.user?.username}</h3>
              </div>
              {!isBlock &&
                (comment?.reply ? (
                  <div className="px-2 w-full overflow-hidden">
                    <div
                      style={{ maxWidth: "180px" }}
                      className="flex justify-start items-center space-x-2 border-l-2 border-color_8774e1 w-full"
                    >
                      {comment?.reply?.attachment?.data?.length && (
                        <div className="w-7 h-7 ml-2">
                          {comment.reply.attachment.data[0].type.includes(
                            "image"
                          ) ? (
                            <img
                              src={comment?.reply?.attachment?.data[0].path}
                              alt="reply message"
                              className="w-full h-full object-cover object-center rounded"
                            />
                          ) : (
                            <video
                              src={
                                comment?.reply?.attachment?.data[0].path +
                                "/" +
                                comment?.reply?.attachment?.data[0].size
                              }
                              alt="reply message"
                              className="w-full h-full object-cover object-center rounded"
                            />
                          )}
                        </div>
                      )}
                      <div className="flex flex-1 flex-col justify-center text-xs items-start text-gray-500 min-w-0 ml-2">
                        <h4 className="text-pink-400 font-medium">
                          {comment?.reply?.user?.username}
                        </h4>
                        <p className="truncate w-full">
                          {comment?.reply?.content
                            ? comment?.reply?.content
                            : "Album"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null)}
              {!isBlock ? (
                <div className="font-medium text-color_f8f8f8 max-w-full break-words">
                  <p>{comment?.content}</p>
                </div>
              ) : (
                <div className="font-medium text-color_f8f8f8 max-w-full break-words text-xs">
                  <i>This user has been blocked by you</i>
                </div>
              )}
            </div>
            {!isBlock && (
              <div className="absolute right-1 bottom-1 font-light text-color_707579 text-sm">
                <span>
                  {date &&
                    (date.getHours() < 10
                      ? "0" + date.getHours()
                      : date.getHours()) +
                      ":" +
                      (date.getMinutes() < 10
                        ? "0" + date.getMinutes()
                        : date.getMinutes())}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isBlock && (
        <div className="text-gray-600 text-sm  flex justify-end items-center space-x-5 rounded-sm px-2 py-px invisible opacity-0 group-hover:opacity-100 group-hover:visible">
          <div
            onClick={onReplyCmt}
            className="p-1 cursor-pointer hover:text-gray-400"
          >
            <i className="fas fa-reply"></i>
          </div>
          <div className="p-1 cursor-pointer hover:text-gray-400">
            <i className="fas fa-flag"></i>
          </div>
          <div
            onClick={onBlockUser}
            className="p-1 cursor-pointer hover:text-gray-400"
          >
            <i className="fas fa-user-slash"></i>
          </div>
          <div className="p-1 cursor-pointer hover:text-gray-400">
            <i className="fas fa-thumbtack"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Comment);
