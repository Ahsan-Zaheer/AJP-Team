import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { FaList } from "react-icons/fa";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils/helper";
import clsx from "clsx";
import {UserInfo} from "../UserInfo";
import Button from "../Button";
import ConfirmatioDialog from "../Dialogs";
import {toast} from "sonner"
import  AddTask  from "./AddTask";
import TaskAssets from "./TaskAssets"
import TaskColor from "./TaskColor"
import { useTrashTastMutation } from "../../redux/slices/api/taskApiSlice";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";



const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {

  const user = useAuthStore(state => state.user);

   // initialize with role-filtered tasks


  const userTasks = tasks.filter(task =>
    task.team.some(member => member._id?.toString() === user?.id)
  );

  const filteredTasks =
    user?.role === "admin" ? tasks : userTasks;

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState(filteredTasks);


useEffect(() => {
  const term = searchTerm.toLowerCase();

  const searched = filteredTasks.filter(task => {
    const titleMatch = task.title?.toLowerCase().includes(term);
    const priorityMatch = task.priority?.toLowerCase().includes(term);
    const dateMatch = formatDate(new Date(task.date))?.toLowerCase().includes(term);
    
    const employeeMatch = task.team?.some(member =>
      member.name?.toLowerCase().includes(term)
    );

    return titleMatch || priorityMatch || dateMatch || employeeMatch;
  });

  setFilteredList(searched);
}, [searchTerm, filteredTasks]);



    
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [deleteTask] = useTrashTastMutation();

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClickHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteTask({
        id: selected,
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

  const TableHeader = () => (
    <thead className="border-bottom">
      <tr className="text-dark">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Created At</th>
        <th className="py-2">Assets</th>
        <th className="py-2">Team</th>
        <th className="py-2 text-end">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-bottom text-secondary table-hover">
      <td className="py-2">
        <div className="d-flex align-items-center gap-2">
          <TaskColor className={TASK_TYPE[task.stage]} />
          <p className="text-dark mb-0 text-truncate" style={{ maxWidth: "200px" }}>
            {task?.title}
          </p>
        </div>
      </td>

      <td className="py-2">
        <div className="d-flex align-items-center gap-1">
          <span className={clsx("fs-5", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className="text-capitalize text-truncate">
            {task?.priority} Priority
          </span>
        </div>
      </td>

      <td className="py-2">
        <small className="text-muted">{formatDate(new Date(task?.date))}</small>
      </td>

      <td className='py-2'>
        <TaskAssets
          activities={task?.activities?.length}
          subTasks={task?.subTasks}
          assets={task?.assets?.length}
        />
      </td>

      <td className="py-2">
        <div className="d-flex">
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "me-1 position-relative", // 👈 Ensure container is relative
                BGS[index % BGS?.length],
                "d-flex align-items-center justify-content-center rounded-circle text-white text-center"
              )}
              style={{ width: "28px", height: "28px", fontSize: "12px" }}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>


      <td className="py-2 d-flex gap-2 justify-content-end">
        <Button
          className="btn btn-link text-primary p-0 text-sm"
          label="Edit"
          type="button"
          onClick={() => editClickHandler(task)}

        />
        <Button
          className="btn btn-link text-danger p-0 text-sm"
          label="Delete"
          type="button"
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="bg-white shadow rounded p-3 p-md-4 mb-4">
        <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by task title, priority, date, or employee name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <TableHeader />
            <tbody>
              {filteredList.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />
    </>
  );
};

export default Table;
