import TaskCard from "./TaskCard";
import { useAuthStore } from "../store/authStore";

const BoardView = ({ tasks, refetch}) => {

  const user = useAuthStore(state => state.user);

  const userTasks = tasks.filter(task =>
    task.team.some(member => member._id?.toString() === user?.id)
  );


  const todoTasks = user?.role === "admin" ? tasks.filter(task => task.stage === "todo") : userTasks.filter(task => task.stage === "todo") ;
  const inProgressTasks =  user?.role === "admin" ? tasks.filter(task => task.stage === "in progress") :userTasks.filter(task => task.stage === "in progress");
  const doneTasks =  user?.role === "admin" ? tasks.filter(task => task.stage === "completed") : userTasks.filter(task => task.stage === "completed");

  return (
    <div className="d-flex justify-contemt-between">
    <div className="w-100 py-4 row g-3 g-xxl-5 d-block d-md-none">
      {userTasks.map((task, index) => (
        <div key={index} className="col-12 col-sm-6 col-md-4">
          <TaskCard task={task}  refetch={refetch}/>
        </div>
      ))}
    </div>

    <div className="w-100 p-3 ps-0 row g-3  d-none d-md-block">
      {todoTasks.map((task, index) => (
        <div key={index} className="col-12 ">
          <TaskCard task={task} refetch={refetch} />
        </div>
      ))}
    </div>
    
    <div className="w-100 p-3 row g-3  d-none d-md-block">
      {inProgressTasks.map((task, index) => (
        <div key={index} className="col-12 ">
          <TaskCard task={task} refetch={refetch} />
        </div>
      ))}
    </div>
    <div className="w-100 p-3 row g-3  d-none d-md-block">
      {doneTasks.map((task, index) => (
        <div key={index} className="col-12">
          <TaskCard task={task} refetch={refetch} />
        </div>
      ))}
    </div>

    </div>
  );
};

export default BoardView;