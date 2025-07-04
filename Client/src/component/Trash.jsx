import clsx from "clsx";
import React, { useState, useEffect } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
// import { tasks } from "../assets/data";
import Title from "../component/Title";
import Button from "../component/Button";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils/helper";
// import AddUser from "../component/AddUser";
import ConfirmatioDialog from "../component/Dialogs";
import { useDeleteRestoreTastMutation, useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Loading from "./Loader";
import { useLeaveStore } from "../store/leaveStore";
import { useAuthStore } from "../store/authStore";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {


  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");
  const [searchParams] = useSearchParams();
  const [searchTerm] = useState(searchParams.get("search") || "");

  const { data, isLoading, refetch } = useGetAllTaskQuery({
    strQuery: "",
    isTrashed: "true",
    search: searchTerm,
  });
  const [deleteRestoreTask] = useDeleteRestoreTastMutation();
  const { leaves, getLeaves, deletePermanentLeave, restoreLeave } = useLeaveStore();
  const trashedLeaves = leaves?.filter((leave) => leave.isTrashed);
  const { users, getAllEmployees} = useAuthStore();

  useEffect(() => {
          getAllEmployees();
      }, []);
  

  useEffect(() => {
         getLeaves(); 
      }, [ getLeaves ]);


  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  const deleteRestoreHandler = async () => {
    try {
      let res = null;

      switch (type) {
        case "delete":
          res = await deleteRestoreTask({
            id: selected,
            actionType: "delete",
          }).unwrap();
          break;
        case "deleteAll":
          res = await deleteRestoreTask({
            id: "",
            actionType: "deleteAll",
          }).unwrap();
          break;
        case "restore":
          res = await deleteRestoreTask({
            id: selected,
            actionType: "restore",
          }).unwrap();
          break;
        case "restoreAll":
          res = await deleteRestoreTask({
            id: selected,
            actionType: "restoreAll",
          }).unwrap();
          break;

          case "deleteLeaf":
            deletePermanentLeave(selected);
            
            break;

        case "restoreLeaf":
          // your zustand method to restore a single leave
          restoreLeave(selected);
          
          break;

      }

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
        refetch();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

    const getEmployeeName = (id) => {
        const employee = users.find((user) => user._id === id);
        
        return employee ? `${employee.name}` : 'Unknown';
    };


  const TableHeader = () => (
    <thead className="border-bottom border-secondary">
      <tr className="text-dark text-start">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Stage</th>
        <th className="py-2">Modified On</th>
        <th className="py-2 text-end">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className="border-bottom text-secondary table-row-hover">
      <td className="py-2">
        <div className="d-flex align-items-center gap-2">
          <div className={clsx("rounded-circle", TASK_TYPE[item.stage])} style={{ width: 16, height: 16 }} />
          <p className="text-dark mb-0">{item?.title}</p>
        </div>
      </td>

      <td className="py-2 text-capitalize">
        <div className="d-flex align-items-center gap-1">
          <span className={clsx("fs-5 d-flex align-items-center", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span>{item?.priority}</span>
        </div>
      </td>

      <td className="py-2 text-capitalize text-center text-md-start">
        {item?.stage}
      </td>

      <td className="py-2 text-muted small">{new Date(item?.date).toDateString()}</td>

      <td className="py-2 d-flex justify-content-end gap-1">
        <Button
          icon={<MdOutlineRestore className="fs-5 text-secondary" />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className="fs-5 text-danger" />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  const LeafHeader = () => (
      <thead className="border-bottom border-secondary">
        <tr className="text-dark text-start">
          <th className="py-2">Name</th>
          <th className="py-2">Type</th>
          <th className="py-2">From</th>
          <th className="py-2">To</th>
          <th className="py-2 text-end">Actions</th>
        </tr>
      </thead>
    );

    const LeafRow = ({ leaf }) => (
      <tr className="border-bottom text-secondary table-row-hover">
        <td className="py-2">{getEmployeeName(leaf.userId)}</td>
        <td className="py-2 text-capitalize">{leaf?.leaveType}</td>
        <td className="py-2 text-muted small">{new Date(leaf?.fromDate).toDateString()}</td>
        <td className="py-2 text-muted small">{new Date(leaf?.toDate).toDateString()}</td>
        <td className="py-2 d-flex justify-content-end gap-1">
          <Button
            icon={<MdOutlineRestore className="fs-5 text-secondary" />}
            onClick={() => {
              setSelected(leaf._id);
              setType("restoreLeaf");
              setMsg("Do you want to restore this leave?");
              setOpenDialog(true);
            }}
          />
          <Button
            icon={<MdDelete className="fs-5 text-danger" />}
            onClick={() => {
              setSelected(leaf._id);
              setType("deleteLeaf");
              setMsg("Do you want to permanently delete this leave?");
              setOpenDialog(true);
            }}
          />
        </td>
      </tr>
    );


  return  isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ):(
    <>
      <div className="container-fluid px-md-1 px-0 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Title title="Trashed Tasks" />

          <div className="d-flex gap-2 gap-md-3 align-items-center">
            <Button
              label="Restore All"
              icon={<MdOutlineRestore className="d-none d-md-inline fs-6" />}
              className="d-flex flex-row-reverse gap-1 align-items-center text-dark small"
              onClick={restoreAllClick}
            />
            <Button
              label="Delete All"
              icon={<MdDelete className="d-none d-md-inline fs-6" />}
              className="d-flex flex-row-reverse gap-1 align-items-center text-danger small"
              onClick={deleteAllClick}
            />
          </div>
        </div>

        {data?.tasks?.length > 0 ? (<div className="bg-white px-3 py-3 shadow rounded">
          <div className="table-responsive">
            <table className="table mb-0">
              <TableHeader />
              <tbody>
                {data?.tasks?.map((tk, id) => (
                  <TableRow key={id} item={tk} />
                ))}
              </tbody>
            </table>
          </div>
        </div>) : (
          <div className='w-100 d-flex justify-content-center py-10'>
            <p className='text-lg text-gray'>No Trashed Task</p>
          </div>
        )}
      </div>





      <div className="container-fluid px-md-1 px-0 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Title title="Trashed Leaves" />

          <div className="d-flex gap-2 gap-md-3 align-items-center">
            <Button
              label="Restore All"
              icon={<MdOutlineRestore className="d-none d-md-inline fs-6" />}
              className="d-flex flex-row-reverse gap-1 align-items-center text-dark small"
            />
            <Button
              label="Delete All"
              icon={<MdDelete className="d-none d-md-inline fs-6" />}
              className="d-flex flex-row-reverse gap-1 align-items-center text-danger small"
            />
          </div>
        </div>

        {trashedLeaves.length > 0 ? (
          <div className="bg-white px-3 py-3 shadow rounded">
            <div className="table-responsive">
              <table className="table mb-0">
                <LeafHeader />
                <tbody>
                  {trashedLeaves.map((leaf) => (
                    <LeafRow key={leaf._id} leaf={leaf} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-100 d-flex justify-content-center py-10">
            <p className="text-lg text-gray">No Trashed Leaves</p>
          </div>
        )}


        
      </div>

      {/* <AddUser open={open} setOpen={setOpen} /> */}

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  );
};

export default Trash;
