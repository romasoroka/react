import { createContext, useContext } from "react";
import { AppContextType } from "../types/Context";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error(
      "useAppContext має використовуватися всередині AppProvider"
    );
  return context;
};
