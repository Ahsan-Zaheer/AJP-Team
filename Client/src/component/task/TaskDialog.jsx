import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmatioDialog from "../Dialogs";
import { useChangeTaskStageMutation, useTrashTastMutation, useDuplicateTaskMutation } from "../../redux/slices/api/taskApiSlice";
import '../../assets/transition.css';
import clsx from "clsx";
import TaskColor from "./TaskColor";
import { toast } from "sonner";
import { FaExchangeAlt } from "react-icons/fa";
import { useAuthStore } from "../../store/authStore";



const CustomTransition = ({ children, isVisible }) => {
  return (
    <div className={`custom-fade-scale ${isVisible ? 'show' : 'hide'}`}>
      {children}
    </div>
  );
};


const ChangeTaskActions =  React.forwardRef(({ id, stage, refetch }) => {

  const [changeStage] = useChangeTaskStageMutation();

  const changeHanlder = async (val) => {
    try {
      const data = {
        id,
        stage: val,
      };
      const res = await changeStage(data).unwrap();

      refetch();
      toast.success(res?.message);

    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const items = [
    {
      label: "To-Do",
      stage: "todo",
      icon: <TaskColor className='bg-primary' />,
      onClick: () => changeHanlder("todo"),
    },
    {
      label: "In Progress",
      stage: "in progress",
      icon: <TaskColor className='bg-warning' />,
      onClick: () => changeHanlder("in progress"),
    },
    {
      label: "Completed",
      stage: "completed",
      icon: <TaskColor className='bg-success' />,
      onClick: () => changeHanlder("completed"),
    },
  ];

  return (
    <>
      <Menu as="div" className="position-relative d-inline-block text-start">
      <Menu.Button
        className={clsx(
          "d-inline-flex w-100 align-items-center gap-2 rounded px-4 py-2 text-muted small fw-medium"
        )}
      >
        <FaExchangeAlt />
        <span>Change Task</span>
      </Menu.Button>

      <CustomTransition >
        <Menu.Items className="position-absolute p-3 start-0 mt-2 w-100 bg-white shadow rounded border border-black border-opacity-25"  style={{
    maxHeight: "60vh",
    overflowY: "auto",
  }}>
          <div className="px-1 py-1 d-grid gap-2">
            {items.map((el) => (
              <Menu.Item key={el.label} disabled={stage === el.stage}>
                {({ active }) => (
                  <button
                    disabled={stage === el.stage}
                    onClick={el?.onClick}
                    className={clsx(
                      active ? "bg-light text-dark" : "text-dark",
                      "d-flex gap-2 w-100 align-items-center rounded px-2 py-2 small disabled opacity-50"
                    )}
                  >
                    {el.icon}
                    {el.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </CustomTransition>
    </Menu>

    </>
  );
});

const TaskDialog = ({ task, refetch }) => {
  const {user} = useAuthStore();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  
  const [deleteTask] = useTrashTastMutation();
  const [duplicateTask] = useDuplicateTaskMutation();

  const deleteClicks = () => {
    setOpenDialog(true);
  };

    const deleteHandler = async () => {
    try {
      const res = await deleteTask({
        id: task._id,
        isTrashed: "trash",
      }).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const duplicateHanlder = async () => {
    try {
      const res = await duplicateTask(task._id).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };






  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className='me-2' />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className='me-2' />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className='me-2' />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className='me-2' />,
      onClick: () => duplicateHanlder(),
    },
  ];

  return (
    <>
      <div className='position-relative d-inline-block'>
        <Menu as='div' className='d-inline-block text-start'>
          <Menu.Button className='btn btn-light text-secondary p-2'>
            <BsThreeDots style={{fontSize: '20px'}} />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='position-absolute p-3 end-0 mt-2 border rounded bg-white shadow ' style={{ width: "14rem", zIndex: 999, maxHeight: "70vh", // limit height on mobile
    overflowY: "auto", }}>
              <div className='mb-2 d-grid gap-2'>
                {items.map((el, index) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        disabled={index === 0 ? false : !user?.role === "admin"}
                        onClick={el?.onClick}
                        className={`btn btn-sm text-start d-flex align-items-center ${
                          active ? "btn-primary text-white" : "btn-light text-dark"
                        }`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <div className='px-2 py-2'>
                <Menu.Item>
                  {() => (
                      <ChangeTaskActions id={task._id} {...task} refetch={refetch} />
                    )}
                </Menu.Item>
              </div>

              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      disabled={!user?.role === "admin"}
                      onClick={() => deleteClicks()}
                      className={`btn btn-sm d-flex align-items-center text-start ${
                        active ? "btn-primary text-white" : "btn-outline-danger"
                      }`}
                    >
                      <RiDeleteBin6Line className='me-2 text-danger' />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
        key={new Date().getTime()}
      />

      <AddSubTask open={open} setOpen={setOpen} />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default TaskDialog;
