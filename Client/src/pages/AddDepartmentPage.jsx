import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddDepartmentLayer from "../components/AddDepartmentLayer";


const AddDepartmentPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Add Department" />

        {/* AddUserLayer */}
        <AddDepartmentLayer />


      </MasterLayout>
    </>
  );
};

export default AddDepartmentPage;
