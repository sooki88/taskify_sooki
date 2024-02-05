import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

const UpdateTriggerContext = createContext({
  isTriggered: false,
  toggleTrigger: () => {},
});

export const useTrigger = () => useContext(UpdateTriggerContext);

export const UpdateTriggerProvider = ({ children }: { children: ReactNode }) => {
  const [isTriggered, setIsTriggered] = useState(false);

  const toggleTrigger = useCallback(() => {
    setIsTriggered((prevState) => !prevState);
  }, []);

  return (
    <UpdateTriggerContext.Provider value={{ isTriggered, toggleTrigger }}>{children}</UpdateTriggerContext.Provider>
  );
};
