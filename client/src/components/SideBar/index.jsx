import { useContext, useState } from "react";
import { UserContext } from "../../context/authContext";
import CreateGroup from "../CreateGroup";
import Groups from "../Groups";
import TopSideBar from "../TopSideBar";
import Settings from "../Settings";

const SideBar = () => {
  const { user } = useContext(UserContext);
  const [openSettings, setOpenSettings] = useState(false);
  return (
    <section className="flex-1 flex flex-col justify-start bg-color_212121 text-color_c7c7c7 py-2 min-w-420 max-h-screen w-420 space-y-1 sticky top-0 self-start">
      {openSettings ? (
        <Settings handleCloseSettings={setOpenSettings} />
      ) : (
        <div className="relative">
          <TopSideBar handleOpenSettings={setOpenSettings} />
          <div className="w-full max-h-screen py-2 px-4 overflow-hidden">
            <div className="w-full">
              <div className="flex justify-start items-center border-b border-black w-full">
                <div className="px-3 py-3 cursor-pointer hover:bg-color_2b2b2b rounded-lg">
                  <span className="text-color_aaaaaa font-medium text-base">
                    All Chats
                  </span>
                </div>
                <div className="px-3 py-3 cursor-pointer hover:bg-color_2b2b2b rounded-lg">
                  <span className="text-color_aaaaaa font-medium text-base">
                    Personal
                  </span>
                </div>
              </div>
              <Groups />
            </div>
          </div>
          <CreateGroup user={user} />
        </div>
      )}
    </section>
  );
};

export default SideBar;
