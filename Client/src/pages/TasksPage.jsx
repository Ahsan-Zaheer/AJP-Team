import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import Tasks from "../component/Tasks";


const TasksPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Tasks Tracker" />

        {/* AddUserLayer */}
        <Tasks />


      </MasterLayout>
    </>
  );
};

export default TasksPage;
