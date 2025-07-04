import React from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { getCompletedSubTasks } from "../../utils/helper";

const TaskAssets = ({ activities, assets, subTasks }) => {
  return (
    <div className="d-flex align-items-center gap-3">
      <div className="d-flex align-items-center gap-1 text-muted small">
        <BiMessageAltDetail />
        <span>{activities}</span>
      </div>
      <div className="d-flex align-items-center gap-1 text-muted small">
        <MdAttachFile />
        <span>{assets}</span>
      </div>
      <div className="d-flex align-items-center gap-1 text-muted small">
        <FaList />
        <span>
          {getCompletedSubTasks(subTasks)}/{subTasks?.length}
        </span>
      </div>
    </div>
  );
};

export default TaskAssets;
