import { memo, useContext } from "react";
import Comment from "../Comment";
import { UserContext } from "../../context/authContext";

const Comments = ({ comments }) => {
  const { user } = useContext(UserContext);
  const { blockList } = user;
  return (
    <div className="h-auto w-full space-y-3 pt-5 pb-32">
      {comments.map((comment, index) => {
        let isBlock = false;
        for (let i = 0; i < blockList?.length; ++i) {
          if (blockList[i]?._id === comment?.user?._id) {
            isBlock = true;
            break;
          } else {
            isBlock = false;
          }
        }
        if (isBlock) {
          return (
            <Comment key={index} comment={comment} user={user} isBlock={true} />
          );
        }
        return (
          <Comment key={index} comment={comment} user={user} isBlock={false} />
        );
      })}
    </div>
  );
};

export default memo(Comments);
