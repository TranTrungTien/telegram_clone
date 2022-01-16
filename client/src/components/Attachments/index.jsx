import Attachment from "../Attachment";
import { useEffect, useState } from "react";
import socket from "../../Utils/connectSocket";

const Attachments = ({ attachments, attachmentsLength, messageId }) => {
  const [currentAttachmentData, setCurrentAttachmentData] = useState([]);
  console.log("image re-render");
  useEffect(() => {
    socket.on("r_files", (filesList) => {
      console.log("receive files run ..............................");
      console.log({ filesList });
      if (!attachments) {
        console.log(filesList?.response?.message);
        if (messageId === filesList?.response?.message) {
          const { data } = filesList?.response;
          console.log({ data });
          setCurrentAttachmentData(data);
        }
      }
    });
  }, [attachments, messageId, setCurrentAttachmentData]);
  const attachmentData = attachments?.data;
  let grid = 0;
  if (attachmentData?.length) {
    grid =
      attachmentData.length === 1 ? 1 : attachmentData.length === 2 ? 2 : 3;
  }
  if (!grid) {
    grid = attachmentsLength === 1 ? 1 : attachmentsLength === 2 ? 2 : 3;
  }
  const newLength = new Array(attachmentsLength).fill(1);
  console.log({ newLength });
  return (
    <div className="w-full">
      <div className="w-full">
        <div
          style={{ maxWidth: "414px", minWidth: "414px" }}
          className={`flex-1 grid grid-cols-${grid} gap-px`}
        >
          {attachmentData?.length
            ? attachmentData.map((item, index) => (
                <Attachment key={index} item={item} />
              ))
            : currentAttachmentData.length
            ? currentAttachmentData.map((item, index) => (
                <Attachment key={index} item={item} />
              ))
            : attachmentsLength &&
              newLength.map((value, index) => <Attachment key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default Attachments;
