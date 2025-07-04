import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import Leave from "../component/Leave";



const LeavePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Leaves Tracker" />

        {/* AddUserLayer */}
        <Leave />


      </MasterLayout>
    </>
  );
};

export default LeavePage;
