import { createContext, useState } from "react";

export const ConversationContext = createContext();

const ConversationContextProvider = ({ children }) => {
  const [conversation, setConversation] = useState({});

  const conversationContextData = {
    conversation,
    setConversation,
  };
  return (
    <ConversationContext.Provider value={conversationContextData}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
