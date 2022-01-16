import { useContext } from "react";
import { ModelContext } from "../../context/modelContext";

const ImageCard = ({ path }) => {
  return (
    <img
      src={path && path}
      alt="Girl"
      style={{ minHeight: "220px" }}
      className="w-full h-full object-cover object-center rounded"
    />
  );
};

const VideoCard = ({ path, size, handleOpenModel }) => {
  const onOpenModel = () => {
    if (handleOpenModel) {
      handleOpenModel();
    }
  };
  return (
    <div className="relative group">
      <video
        src={path && path + "/" + size}
        alt="Girl"
        style={{ minHeight: "120px", maxHeight: "300px" }}
        className="w-full h-full object-cover object-center rounded"
      />
      <button
        onClick={onOpenModel}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl"
      >
        <i className="fas fa-play"></i>
      </button>
    </div>
  );
};

const Attachment = ({ item }) => {
  console.log("image card re-render");
  console.log({ item });
  const { handleSetModel } = useContext(ModelContext);
  const onOpenModel = () => {
    console.log("clicked");
    if (handleSetModel) {
      const newModel = {
        ...item,
        isModelOpen: true,
      };
      console.log({ newModel });
      handleSetModel(newModel);
    }
  };
  return (
    <div className="cursor-pointer rounded-md" onClick={onOpenModel}>
      {item ? (
        item?.type.includes("image") ? (
          <ImageCard path={item?.path} />
        ) : (
          <VideoCard
            path={item?.path}
            size={item?.size}
            handleOpenModel={onOpenModel}
          />
        )
      ) : (
        ""
      )}
      {item ? "" : <div className="w- h-52 rounded bg-color_707579"></div>}
    </div>
  );
};

export default Attachment;
