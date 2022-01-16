import Group from "../Group";
import "./groups.css";
import { UserContext } from "../../context/authContext";
import { useContext } from "react";

const Groups = () => {
  const { user } = useContext(UserContext);
  const { conversationList } = user;
  console.log({ conversationList });
  return (
    <div
      style={{ height: "calc(100vh - 110px)" }}
      className="w-full py-2 overflow-y-auto"
    >
      {conversationList?.length
        ? conversationList.map((conversation, index) => {
            return <Group key={index} con={conversation} />;
          })
        : ""}
    </div>
  );
};

export default Groups;
