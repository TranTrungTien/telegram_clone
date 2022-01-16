import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/authContext";
import { CommentContext } from "../../context/commentContext";
import { ConversationContext } from "../../context/conversationContext";
import { ReplyCommentContext } from "../../context/replyComment";
import axios from "../../Utils/axiosConfig";
import socket from "../../Utils/connectSocket";
import Emoji from "../Emoji";
import Input from "../Input";
import PreviewImageAndVideo from "../PreviewImageAndVideo";

const ChatInput = () => {
  const { user } = useContext(UserContext);
  const { setComments } = useContext(CommentContext);
  const { conversation } = useContext(ConversationContext);
  const { replyComment, setReplyComment } = useContext(ReplyCommentContext);
  const [files, setFiles] = useState([]);
  const [emoji, setEmoji] = useState(null);
  const [cleanInput, setCleanInput] = useState(false);
  const scrollRef = useRef();
  useEffect(() => {
    if (!scrollRef.current) {
      scrollRef.current = document.querySelector("#chatarea-scrollbar");
    }
  }, []);

  console.log({ emoji });

  const onChangeFile = async (e) => {
    const filesInput = e.target.files;
    setFiles([...files, ...filesInput]);
  };
  const onSendMessage = async (e) => {
    e.preventDefault();
    console.log("on send message");
    const newMessage = e.target?.message_input?.value;

    try {
      const message = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/messages/${conversation?._id}/${user._id}`,
        {
          content: newMessage,
          reply_message_id: replyComment?._id ? replyComment?._id : null,
        },
        {
          headers: {
            "Content-Types": "application/json",
          },
        }
      );
      const messageObj = {
        _id: message.data?.response?._id,
        user: user,
        conversation_id: conversation?._id,
        reply: replyComment,
        content: newMessage,
        attachment: null,
        attachmentsLength: files?.length,
        updatedAt: new Date(),
      };
      console.log({ message });

      socket.emit("send-message", messageObj);
      setComments((preComment) => [...preComment, ...[messageObj]]);
      if (files.length) {
        const formData = new FormData();

        files.forEach((file) => {
          formData.append(file?.size, file);
        });

        const saveFileOnCloud = async () => {
          const filesList = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/attachments/${message.data?.response?._id}`,
            formData,
            {
              headers: {
                "Content-Types": "multipart/form-data",
              },
            }
          );
          return filesList.data;
        };

        saveFileOnCloud()
          .then((filesList) => {
            const attachmentID = {
              attachment_id: filesList?.response?._id,
            };
            try {
              axios.patch(
                `${process.env.REACT_APP_SERVER_URL}/messages/update-attachment/${conversation?._id}/${user?._id}/${message.data?.response?._id}`,
                attachmentID,
                {
                  headers: {
                    "Content-Types": "application/json",
                  },
                }
              );
            } catch (error) {
              console.log({ error });
            }
            socket.emit("s_files", filesList, conversation?._id);
          })
          .catch((err) => console.log({ err }));
      }
    } catch (error) {
      console.log({ error });
    }
    e.target.message_input.focus();
    setCleanInput(!cleanInput);
    setReplyComment(null);
    setFiles([]);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  const onRemoveFile = (newList) => {
    console.log({ newList });
    setFiles([...newList]);
  };

  const onRemoveReply = () => {
    if (setReplyComment) {
      setReplyComment(null);
    }
  };
  return (
    <div
      style={{ width: "715px" }}
      className="flex flex-col justify-center items-end relative"
    >
      {files.length ? (
        <PreviewImageAndVideo filesList={files} onChangeList={onRemoveFile} />
      ) : (
        ""
      )}
      <div className="absolute -top-16 right-0">
        <button className="text-color_c5c5c5 text-lg font-thin px-5 py-3 rounded-full bg-color_2b2b2b">
          <i className="fas fa-arrow-down"></i>
        </button>
        <span className="absolute -top-3 -left-1 text-sm text-color_c5c5c5 px-3 py-1 rounded-full font-semibold bg-color_8774e1">
          12345
        </span>
      </div>
      <div className="flex justify-center items-end space-x-2 py-px bg-color_0f0f0f rounded-md w-full">
        <div className="w-full">
          {replyComment ? (
            <div className="flex justify-start items-center max-w-full bg-color_2b2b2b mb-1 rounded-sm px-2 py-1 space-x-2">
              <button
                className="text-xl text-gray-500 hover:text-gray-300 px-2 py-px"
                onClick={onRemoveReply}
              >
                <i className="fa fa-times"></i>
              </button>
              <div className="flex flex-col justify-center items-start  min-w-0 truncate">
                <h3 className="text-pink-500 font-medium">
                  {replyComment?.user?.username}
                </h3>
                <p className="text-sm max-w-full text-gray-300">
                  {replyComment?.content}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
          <form onSubmit={onSendMessage} className="w-full">
            <div className="flex justify-start items-center space-x-3 w-full bg-color_2b2b2b rounded-md px-2">
              <Emoji setEmoji={setEmoji} />
              <div className="flex-1 py-3">
                <Input emoji={emoji} cleanInput={cleanInput} />
              </div>
              <label className="relative text-color_aaaaaa bg-transparent text-lg rounded-full px-2 py-1  hover:bg-color_292730">
                <input
                  type="file"
                  name="attachments"
                  className="absolute top-0 left-0 w-full h-full opacity-0"
                  multiple
                  accept="image/*, video/*, audio/*"
                  onChange={onChangeFile}
                />
                <i className="fas fa-paperclip"></i>
              </label>
            </div>
          </form>
        </div>
        <div>
          <button className="text-color_c5c5c5 text-lg font-thin px-5 py-3 rounded-full bg-color_2b2b2b">
            <i className="fas fa-microphone"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
