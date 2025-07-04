import { Icon } from '@iconify/react/dist/iconify.js';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDepartmentStore } from '../store/depStore';





const DepartmentListLayer = () => {

    const {departments, getDepartments, deleteDepartment} = useDepartmentStore();

    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          getDepartments();
        }
    }, [getDepartments]);
    useEffect(() => {
        if (departments?.departments?.length) {
            setFilteredDepartments(departments.departments);
        }
    }, [departments]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        if (!value) {
            setFilteredDepartments(departments.departments || []);
            return;
        }

        const filtered = departments.departments.filter(department =>
            department.dep_name.toLowerCase().includes(value)
        );
        setFilteredDepartments(filtered);
    };


    


    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this department?");
        if (!confirm) return;
        else{
        const res = deleteDepartment(id);
        if (res) {
            getDepartments();
        } else {
            console.error("Error deleting department:", res.message);
        }

        }
        

    }

 

    return (
        <div className="card">
            <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="d-flex flex-wrap align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <span>Show</span>
                        <select className="form-select form-select-sm w-auto" defaultValue="Select Number">
                            <option value="Select Number" disabled>
                                Select Number
                            </option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div className="icon-field">
                         <input
                            type="text"
                            className="form-control form-control-sm w-auto"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <span className="icon">
                            <Icon icon="ion:search-outline" />
                        </span>
                    </div>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-3">
                   
                    <Link to="/add-department" className="btn btn-sm btn-primary-600">
                        <i className="ri-add-line" /> Add Department
                    </Link>
                </div>
            </div>
            <div className="card-body">
                <table className="table bordered-table mb-0">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="form-check style-check d-flex align-items-center">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        defaultValue=""
                                        id="checkAll"
                                    />
                                    <label className="form-check-label" htmlFor="checkAll">
                                        S.L
                                    </label>
                                </div>
                            </th>
                           
                            <th scope="col">Name</th>
                            <th scope="col">Members</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDepartments?.map((department, index) => (
                             <tr key={index}>
                                     <td>
                                         <div className="form-check style-check d-flex align-items-center">
                                             <input
                                                 className="form-check-input"
                                                 type="checkbox"
                                                 defaultValue=""
                                                 id="check1"
                                             />
                                             <label className="form-check-label" htmlFor="check1">
                                                 0{++index}
                                             </label>
                                         </div>
                                     </td>
                                     <td>
                                         <div className="d-flex align-items-center">
                                             <img
                                                 src="assets/images/user-list/user-list1.png"
                                                 alt=""
                                                 className="flex-shrink-0 me-12 radius-8"
                                             />
                                             <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                                 {department.dep_name}
                                             </h6>
                                         </div>
                                     </td>
                                     <td>{department.dep_members}</td>

                                     <td>
                                         <Link
                                             to={`/edit-department/${department._id}`}
                                             className="w-32-px h-32-px  me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center         justify-content-center"
                                         >
                                             <Icon icon="iconamoon:eye-light" />
                                         </Link>
                                         <Link
                                             to={`/edit-department/${department._id}`}
                                             className="w-32-px h-32-px  me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center        justify-content-center"
                                         >
                                             <Icon icon="lucide:edit" />
                                         </Link>
                                         <span
                                             
                                             onClick={()=>handleDelete(department._id)}
                                             className="w-32-px h-32-px  me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center      justify-content-center"
                                         >
                                             <Icon icon="mingcute:delete-2-line" />
                                         </span>
                                     </td>
                                </tr>
                            
                            
                            ))}

                       
                       
                       
                       
                     
                    </tbody>
                </table>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24">
                    <span>Showing 1 to 10 of 12 entries</span>
                    <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                        <li className="page-item">
                            <Link
                                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px bg-base"
                                to="#"
                            >
                                <Icon icon="ep:d-arrow-left" className="text-xl" />
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-primary-600 text-white fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px"
                                to="#"
                            >
                                1
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-primary-50 text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px"
                                to="#"
                            >
                                2
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link bg-primary-50 text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px"
                                to="#"
                            >
                                3
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px bg-base"
                                to="#"
                            >
                                {" "}
                                <Icon icon="ep:d-arrow-right" className="text-xl" />{" "}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


    );
};

export default DepartmentListLayer;