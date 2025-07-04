import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { TaskDetails } from "../component/TaskDetails";


const TaskDetailsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Task Details" />

        {/* AddUserLayer */}
        <TaskDetails />


      </MasterLayout>
    </>
  );
};

export default TaskDetailsPage;
