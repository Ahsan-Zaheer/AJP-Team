import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import Trash  from "../component/Trash";


const TrashPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Trash" />

        {/* AddUserLayer */}
        <Trash />


      </MasterLayout>
    </>
  );
};

export default TrashPage;
