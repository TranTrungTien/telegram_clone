import { useState } from "react";

const Bar = ({ handleOpenSettings }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const onOpen = () => {
    setOpenMenu(!openMenu);
  };

  const onOpenSettings = () => {
    console.log("click");
    if (handleOpenSettings) {
      handleOpenSettings(true);
    }
  };

  return (
    <div className="relative text-color_aaaaaa">
      <div
        className="cursor-pointer hover:bg-color_2b2b2b px-3 py-2 rounded-full text-xl font-light"
        onClick={onOpen}
      >
        <i className="fas fa-bars "></i>
      </div>
      {openMenu && (
        <div className="absolute top-12 left-0 shadow-2xl p-2 rounded min-w-300 z-10 bg-color_181818">
          <div className="w-full h-full">
            <div className="flex justify-start items-center px-5 py-4 hover:bg-color_2b2b2b rounded space-x-7 text-xl cursor-pointer">
              <i className="fas fa-bookmark"></i>
              <span className="text-base text-color_c5c5c5 font-semibold">
                Saved Messages
              </span>
            </div>
            <div className="flex justify-start items-center px-5 py-4 hover:bg-color_2b2b2b rounded space-x-7 text-xl cursor-pointer">
              <i className="fas fa-user"></i>
              <span className="text-base text-color_c5c5c5 font-semibold">
                Contacts
              </span>
            </div>
            <div
              onClick={onOpenSettings}
              className="flex justify-start items-center px-5 py-4 hover:bg-color_2b2b2b rounded space-x-7 text-xl cursor-pointer"
            >
              <i className="fas fa-cog"></i>
              <span className="text-base text-color_c5c5c5 font-semibold">
                Settings
              </span>
            </div>
            <div className="flex justify-between items-center px-5 py-4 hover:bg-color_2b2b2b rounded space-x-7 text-xl">
              <div className="flex justify-start items-center text-xl space-x-7">
                <i className="fas fa-moon"></i>
                <span className="text-base text-color_c5c5c5 font-semibold">
                  Dark Mode
                </span>
              </div>
              <div className="relative w-12 h-6 rounded-full bg-black">
                <span className="absolute w-5 h-5 rounded-full bg-gray-50 left-px top-1/2 transform -translate-y-1/2"></span>
              </div>
            </div>
            <div className="flex justify-between items-center px-5 py-4 hover:bg-color_2b2b2b rounded space-x-7 text-xl">
              <div className="flex justify-start items-center text-xl space-x-7">
                <i className="fas fa-rocket"></i>
                <span className="text-base text-color_c5c5c5 font-semibold">
                  Animation
                </span>
              </div>
              <div className="relative w-12 h-6 rounded-full bg-black">
                <span className="absolute w-5 h-5 rounded-full bg-gray-50 left-px top-1/2 transform -translate-y-1/2"></span>
              </div>
            </div>
            <div className="flex justify-start items-center px-5 py-4 hover:bg-color_2b2b2b rounded space-x-7 text-xl cursor-pointer">
              <i className="fas fa-question-circle"></i>
              <span className="text-base text-color_c5c5c5 font-semibold">
                Telegram Features
              </span>
            </div>
            <div className="flex justify-start items-center px-5 py-4 hover:bg-color_2b2b2b rounded space-x-7 text-xl">
              <i className="fas fa-bug"></i>
              <span className="text-base text-color_c5c5c5 font-semibold">
                Report Bug
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bar;
