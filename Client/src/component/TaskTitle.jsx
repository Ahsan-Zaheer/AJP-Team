import clsx from "clsx";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const TaskTitle = ({ label, className }) => {
  return (
    <div className="w-100 h-40 h-md-48 px-md-3 py-3 rounded bg-white d-flex align-items-center justify-content-between">
      <div className="d-flex gap-2 align-items-center ps-3">
        <div className={clsx("rounded-circle", className)} style={{ width: '1rem', height: '1rem' }} />
        <p className="mb-0 text-secondary fs-6 fs-md-5">{label}</p>
      </div>

      <button className="d-none d-md-block btn btn-link p-0">
        <IoMdAdd className="fs-4 text-black" />
      </button>
    </div>
  );
};

export default TaskTitle;
