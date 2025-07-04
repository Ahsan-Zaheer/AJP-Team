import clsx from "clsx";
import React from "react";

const TaskColor = ({ className }) => {
  return (
    <div
      className={clsx("rounded-circle d-inline-block", className)}
      style={{ width: "16px", height: "16px" }}
    />
  );
};

export default TaskColor;
