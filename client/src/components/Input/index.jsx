import { useEffect, useState } from "react";

const Input = ({ emoji, cleanInput }) => {
  const [textInput, setTextInput] = useState("");
  console.log({ emoji });
  useEffect(() => {
    setTextInput("");
  }, [cleanInput]);
  useEffect(() => {
    if (emoji?.unified) {
      const unified = emoji.unified.split("-");
      const unifiedArray = [];

      unified.forEach((code) => {
        unifiedArray.push("0x" + code);
      });
      const emojiText = String.fromCodePoint(...unifiedArray);

      setTextInput((pre) => pre + emojiText);
    }
  }, [emoji?.unified]);
  const onChangeInputText = (e) => {
    setTextInput(e.target.value);
  };
  console.log({ textInput });
  return (
    <input
      type="text"
      value={textInput}
      name="message_input"
      autoComplete="off"
      className="w-full h-full bg-transparent hover:bg-transparent focus:outline-none focus:border-transparent text-color_c5c5c5"
      placeholder="Message"
      onChange={onChangeInputText}
    />
  );
};

export default Input;
