import { createContext, useState } from "react";

export const ModelContext = createContext();

const ModelContextProvider = ({ children }) => {
  const [model, setModel] = useState({});

  const handleSetModel = (newModel) => {
    setModel({ ...model, ...newModel });
  };

  const modelContextData = {
    model,
    handleSetModel,
  };

  return (
    <ModelContext.Provider value={modelContextData}>
      {children}
    </ModelContext.Provider>
  );
};
export default ModelContextProvider;
