import { createContext, useState } from "react";

export const ReplyCommentContext = createContext({});

const ReplyCommentContextProvider = ({ children }) => {
  const [replyComment, setReplyComment] = useState(null);

  const replyCommentData = {
    replyComment,
    setReplyComment,
  };

  return (
    <ReplyCommentContext.Provider value={replyCommentData}>
      {children}
    </ReplyCommentContext.Provider>
  );
};

export default ReplyCommentContextProvider;
