const ImageBox = ({ file, handleIndexFile, index }) => {
  console.log("box image rerender");
  const revokeURL = (e) => {
    URL.revokeObjectURL(e.target.src);
  };

  const onRemoveFile = () => {
    console.log("close file");
    if (handleIndexFile) {
      handleIndexFile(index);
    }
  };
  return (
    <div className="h-full w-24 relative">
      <img
        src={
          file
            ? URL.createObjectURL(file)
            : "https://blog.depositphotos.com/wp-content/uploads/2018/08/Depositphotos_3775430_m-2015.jpg.webp"
        }
        alt="preview"
        onLoad={revokeURL}
        className="w-full h-full object-cover object-center rounded"
      />
      <button
        onClick={onRemoveFile}
        className="absolute top-0 right-0 text-2x text-white hover:bg-color_212121 rounded-full py-px px-2"
      >
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
};

const VideoBox = ({ file, handleIndexFile, index }) => {
  console.log("box image rerender");
  const revokeURL = (e) => {
    URL.revokeObjectURL(e.target.src);
  };

  const onRemoveFile = () => {
    console.log("close file");
    if (handleIndexFile) {
      handleIndexFile(index);
    }
  };
  return (
    <div className="h-full w-24 relative">
      <video
        src={file && URL.createObjectURL(file)}
        alt="preview"
        onLoad={revokeURL}
        className="w-full h-full object-cover object-center rounded"
      />
      <button
        onClick={onRemoveFile}
        className="absolute top-0 right-0 text-2x text-white hover:bg-color_212121 rounded-full py-px px-2"
      >
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
};

const PreviewImageAndVideo = ({ filesList, onChangeList }) => {
  console.log({ filesList });
  const onRemoveFile = (index) => {
    if (onChangeList) {
      filesList.splice(index, 1);
      console.log({ filesList });
      onChangeList(filesList);
    }
  };
  return (
    <div className="absolute -top-24 left-0 h-24 overflow-hidden mb-1 w-full">
      <div className="h-full flex justify-start items-center space-x-2">
        {filesList &&
          filesList.map((file, index) =>
            file?.type.includes("image") ? (
              <ImageBox
                key={index}
                file={file}
                handleIndexFile={onRemoveFile}
                index={index}
              />
            ) : (
              <VideoBox
                key={index}
                file={file}
                handleIndexFile={onRemoveFile}
                index={index}
              />
            )
          )}
      </div>
    </div>
  );
};

export default PreviewImageAndVideo;
