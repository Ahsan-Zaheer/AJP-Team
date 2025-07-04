import { useState, useEffect } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "./Loader";
import Title from "./Title";
import Button from "./Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "./Tabs";
import TaskTitle from "./TaskTitle";
import BoardView from "./BoardView";
import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";
import Table from "./task/Table";
import AddTask from "./task/AddTask";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-primary",
  "in progress": "bg-warning",
  completed: "bg-success",
};

const Tasks = ({user}) => {


  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [searchParams] = useSearchParams();
  const [searchTerm] = useState(searchParams.get("search") || "");
  const [open, setOpen] = useState(false);
  const status = params?.status || "";

  const { data, isLoading, refetch } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: searchTerm,
  });

    useEffect(() => {
      
        refetch();
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      
    }, [open]);

    useEffect(() => {
      if (!open) {
        refetch();
      }
    }, [open]);




  



  return isLoading ? (
  <div className='py-4'>
    <Loading />
  </div>
  ) : (
    <div className='container-fluid'>
      <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        <Button
          onClick={() => setOpen(true)}
          label='Create Task'
          icon={<IoMdAdd className='fs-5' />}
          className='d-flex flex-row-reverse align-items-center gap-2 bg-primary text-white rounded py-2 px-3'
        />
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='row py-3 gy-3 gx-2'>
            <div className='col-12 col-sm-4'>
              <TaskTitle label='To Do' className={`${TASK_TYPE.todo} ps-3`} />
            </div>
            <div className='col-12 col-sm-4'>
              <TaskTitle label='In Progress' className={TASK_TYPE["in progress"]} />
            </div>
            <div className='col-12 col-sm-4'>
              <TaskTitle label='Completed' className={TASK_TYPE.completed} />
            </div>
          </div>
        )}

        {selected !== 1 ? (
          <BoardView id={user?.id} role={user?.role} tasks={data?.tasks} refetch={refetch} />
        ) : (
          <div className='w-100'>
            <Table tasks={data?.tasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} refetch={refetch} />
    </div>
  );

};

export default Tasks;