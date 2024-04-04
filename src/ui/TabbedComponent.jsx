// import { useState } from "react";
import NavigationMenu from "./NavigationMenu";

export default function TabbedComponent({ tabs }) {
  //   const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <NavigationMenu>
        {tabs.map((tab) => (
          <li key={tab}>{tab}</li>
        ))}
      </NavigationMenu>
      {/* <ContentComponent>{children}</ContentComponent> */}
    </>
  );
}
