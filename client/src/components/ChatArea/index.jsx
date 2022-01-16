import { memo, useContext, useEffect, useRef } from "react";
import { CommentContext } from "../../context/commentContext";
import axios from "../../Utils/axiosConfig";
import Comments from "../Comments";
import "./Chat.css";

const ChatArea = ({ conversation }) => {
  console.log("chat area re-render");

  const chatListRef = useRef();
  const stopFetchingRef = useRef();
  const previousScrollHeight = useRef();

  const { comments, setComments } = useContext(CommentContext);
  console.log({ comments });

  useEffect(
    () => (chatListRef.current = document.querySelector("#chatarea-scrollbar")),
    []
  );

  useEffect(() => {
    const fetchComment = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/messages/${
          conversation._id
        }/25/${new Date().toUTCString()}`,
        { headers: { "Content-Types": "application/json" } }
      );
      console.log({ paginate: data.doc });
      if (data.doc?.length) {
        setComments(data.doc);
      }
    };

    fetchComment();
  }, [conversation?._id, setComments]);

  const fetchComments = async () => {
    console.log("run ... ", conversation._id);
    const date = comments?.length
      ? comments[0].createdAt
      : new Date().toISOString();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/messages/${conversation._id}/25/${date}`,
        { headers: { "Content-Types": "application/json" } }
      );
      console.log({ paginate: data.doc });
      if (data.doc?.length) {
        setComments((preComments) => {
          return [...data.doc, ...preComments];
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (!chatListRef.current.scrollHeight || !previousScrollHeight.current) {
      return;
    }
    if (chatListRef.current.scrollHeight > previousScrollHeight.current) {
      const scroll_to =
        chatListRef.current.scrollHeight -
        previousScrollHeight.current +
        chatListRef.current.clientHeight / 2;
      chatListRef.current.scrollTo(0, scroll_to);
    }
  }, [chatListRef.current?.scrollHeight]);

  useEffect(() => {
    console.log("scroll bottom");
    if (comments.length === 25 && chatListRef.current) {
      chatListRef.current.scrollTo(0, chatListRef.current.scrollHeight);
    }
  }, [comments?.length]);
  const onScrollChat = (e) => {
    console.log("run scroll");
    console.log({ stop: stopFetchingRef.current });
    if (e.target.scrollTop === 0 && !stopFetchingRef.current) {
      console.log("Top 0");
      stopFetchingRef.current = true;
      previousScrollHeight.current = chatListRef.current.scrollHeight;
      fetchComments()
        .then((value) => {
          if (value) {
            stopFetchingRef.current = false;
          } else {
            console.log("true");
            stopFetchingRef.current = true;
          }
        })
        .catch(() => (stopFetchingRef.current = true));
    }
  };

  return (
    <div
      onScroll={onScrollChat}
      id="chatarea-scrollbar"
      className="overflow-x-hidden bg-color_0f0f0f"
    >
      <div
        style={{
          maxHeight: "calc(100vh - 51px)",
          height: "calc(100vh - 51px)",
          minHeight: "calc(100vh - 51px)",
        }}
        className=" flex flex-col justify-start items-center"
      >
        <div
          onScroll={onScrollChat}
          style={{ width: "705px", maxHeight: "calc(100vh - 51px)" }}
          className="relative"
        >
          <div className="h-auto overflow-x-hidden overflow-y-auto w-full">
            <Comments comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatArea);
