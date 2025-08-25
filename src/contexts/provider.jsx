
import { useState } from "react";
import { TabContext } from "./tabContext";
export function MyProvider({ children }) {
  const [tab, setTab] = useState("all");


  // This function will be available to children
  const updateTab = (newMsg) => {
    setTab(newMsg);
  };

  return (
    <TabContext.Provider value={{ tab, updateTab }}>
      {children}
    </TabContext.Provider>
  );
}