//import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useState } from "react";

const EmojiTable = ({ setEmoji, setIsOnOpenEmojiTable }) => {
  console.log("open");
  const onEmojiClick = (e) => {
    console.log({ e });
    if (setEmoji) {
      setEmoji(e);
      setIsOnOpenEmojiTable(false);
    }
  };
  return <Picker onSelect={onEmojiClick} />;
};
const Emoji = ({ setEmoji }) => {
  const [isOpenEmojiTable, setIsOnOpenEmojiTable] = useState(false);

  const onOpenEmojiTable = () => {
    setIsOnOpenEmojiTable(!isOpenEmojiTable);
  };
  return (
    <div className="">
      <div
        onClick={onOpenEmojiTable}
        className="text-color_aaaaaa bg-transparent text-lg rounded-full px-2 py-1 hover:bg-color_292730 cursor-pointer"
      >
        <i className="far fa-smile"></i>
      </div>
      {isOpenEmojiTable && (
        <div className="absolute left-0 bottom-14">
          <EmojiTable
            setEmoji={setEmoji}
            setIsOnOpenEmojiTable={setIsOnOpenEmojiTable}
          />
        </div>
      )}
    </div>
  );
};

export default Emoji;
