import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils/helper";
import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import {UserInfo }from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task, refetch }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-100 bg-white shadow-sm p-3 rounded" style={{ minHeight: 'fit-content' }}>
        {/* Header */}
        <div className="d-flex justify-content-between mb-2">
          <div
            className={clsx(
              "d-flex flex-grow-1 gap-1 align-items-center fw-medium",
              PRIOTITYSTYELS[task?.priority]
            )}
            style={{ fontSize: '0.875rem' }} // text-sm
          >
            {ICONS[task?.priority]}
            <span className="text-uppercase">{task?.priority} Priority</span>
          </div>

          <TaskDialog task={task} refetch={refetch} />
        </div>

        {/* Title and type */}
        <div className="d-flex align-items-center gap-2 mb-1">
          <div
            className={clsx("rounded-circle", TASK_TYPE[task.stage])}
            style={{ width: '1rem', height: '1rem' }}
          />
          <div className="text-truncate mb-0 text-dark" style={{ maxWidth: '250px', fontSize: '16px' }}>   
            {task?.title}
          </div>
        </div>

        {/* Date */}
        <span className="text-muted" style={{ fontSize: '0.875rem' }}>
          {formatDate(new Date(task?.date))}
        </span>

        {/* Divider */}
        <hr className="my-2" />

        {/* Activity counts and team */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex gap-3">
            <div className="d-flex gap-1 align-items-center text-muted" style={{ fontSize: '0.875rem' }}>
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className="d-flex gap-1 align-items-center text-muted" style={{ fontSize: '0.875rem' }}>
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className="d-flex gap-1 align-items-center text-muted" style={{ fontSize: '0.875rem' }}>
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          <div className="d-flex flex-row-reverse">
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "rounded-circle text-white d-flex align-items-center justify-content-center",
                  BGS[index % BGS?.length]
                )}
                style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  marginRight: '-0.25rem',
                  fontSize: '0.75rem',
                  zIndex: 10 - index,
                }}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>

        {/* Subtasks */}
        {task?.subTasks?.length > 0 ? (
          <div className="py-3 border-top">
            <div className="text-truncate mb-2 text-dark" style={{ fontSize: '1rem' }}>
              {task?.subTasks[0].title}
            </div>

            <div className="d-flex gap-4 px-3">
              <span className="text-muted" style={{ fontSize: '0.875rem' }}>
                {formatDate(new Date(task?.subTasks[0]?.date))}
              </span>
              <span className="bg-primary bg-opacity-10 px-3 py-1 rounded text-primary fw-medium" style={{ fontSize: '0.875rem' }}>
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <div className="py-3 border-top">
            <span className="text-muted">No Sub Task</span>
          </div>
        )}

        {/* Add subtask button */}
        <div className="w-100 pb-2">
          <button
            onClick={() => setOpen(true)}
            // disabled={!user.isAdmin}
            className="w-100 d-flex gap-3 align-items-center text-muted fw-semibold"
            // style={{ fontSize: '0.875rem', cursor: user.isAdmin ? 'pointer' : 'not-allowed' }}
          >
            <IoMdAdd className="fs-4" />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

export default TaskCard;
