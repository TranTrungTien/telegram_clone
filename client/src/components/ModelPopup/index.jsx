import { useContext, useRef } from "react";
import { ModelContext } from "../../context/modelContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const Image = ({ path }) => {
  return (
    <img
      src={path && path}
      className="w-full h-full object-cover object-center rounded-sm"
      alt="model"
    />
  );
};

const Video = ({ path, size }) => {
  return (
    <video
      autoPlay={true}
      loop={true}
      controls={true}
      src={path && path + "/" + size}
      className="w-full h-full object-cover object-center rounded-sm"
      alt="model"
    />
  );
};

const ModelPopup = () => {
  const { model, handleSetModel } = useContext(ModelContext);
  const { isModelOpen, path, type, size } = model;

  const ref = useRef();
  useOnClickOutside(ref, () => handleSetModel({ isModelOpen: false }));
  return isModelOpen ? (
    <div
      style={{ zIndex: 99 }}
      className="absolute top-0 left-0 w-full max-h-screen min-h-screen h-screen"
    >
      <div
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))",
        }}
        className="w-full h-full flex justify-center items-center"
      >
        <div ref={ref} className="w-auto h-full py-1">
          {type && type.includes("image") ? (
            <Image path={path} />
          ) : (
            <Video path={path} size={size} />
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModelPopup;
