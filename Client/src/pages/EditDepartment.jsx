import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditDepartmentLayer from "../components/EditDepartmentLayer";


const EditDepartment = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Edit Department" />

        {/* ViewProfileLayer */}
        <EditDepartmentLayer/>

      </MasterLayout>

    </>
  );
};

export default EditDepartment; 
