import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DepartmentListLayer from "../components/DepartmentListLayer";




const DepartmentPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Department - List" />

        {/* InvoiceListLayer */}
        <DepartmentListLayer />

      </MasterLayout>

    </>
  );
};

export default  DepartmentPage;
