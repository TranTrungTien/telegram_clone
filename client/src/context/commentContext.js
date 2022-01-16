import { createContext, useState } from "react";

export const CommentContext = createContext([]);

const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const commentContextData = {
    comments,
    setComments,
  };
  return (
    <CommentContext.Provider value={commentContextData}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
