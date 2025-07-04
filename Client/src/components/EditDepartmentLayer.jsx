import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDepartmentStore} from '../store/depStore';
import axios from 'axios';


const EditDepartmentLayer = () => {

    const {id} = useParams();

    const navigate = useNavigate();
    
    const {department, getDepartment} = useDepartmentStore();

    const [editDepartment, setEditDepartment] = useState({
        dep_name: '',
        dep_members: '',
        empDepartment: '',
        dep_email: '',
        dep_desc: ''
    } );

        const handleChange = (e) => {
            const { name, value } = e.target;
            
            setEditDepartment({...editDepartment, [name]: value});
        }
    
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
    
                const response = await axios.put(`http://localhost:5000/api/department/${id}`, editDepartment, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
    
                    }
                });
    
                if(response.data.success){
                    navigate('/department-list');
                }
    
                
            } catch (error) {
                console.error("Error submitting form:", error);
                
            }
        }
    
       useEffect(() => {
        getDepartment(id);
        }, [getDepartment, id]);


    const [imagePreview, setImagePreview] = useState('/assets/images/user-grid/user-grid-img13.png');

    const readURL = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    };
    return (
        <div className="row gy-4">
            <div className="col-lg-4">
                <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
                    <img
                        src="assets/images/user-grid/user-grid-bg1.png"
                        alt=""
                        className="w-100 object-fit-cover"
                    />
                    <div className="pb-24 ms-16 mb-24 me-16  mt--100">
                        <div className="text-center border border-top-0 border-start-0 border-end-0">
                            <img
                                src="assets/images/user-grid/user-grid-img14.png"
                                alt=""
                                className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
                            />
                            <h6 className="mb-0 mt-16">{department.dep_name}</h6>
                            <span className="text-secondary-light mb-16">{department.dep_email ? department.dep_email : "Department Has no Email"}</span>
                        </div>
                        <div className="mt-24">
                            <h6 className="text-xl mb-16">Department Info</h6>
                            <ul>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                     Name
                                    </span>
                                    <span className="w-60 text-secondary-light fw-medium">
                                        : {department.dep_name}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Email
                                    </span>
                                    <span className="w-60 text-secondary-light fw-medium">
                                        : {department.dep_email ? department.dep_email : "Department Has no Email"}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                         Members
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {department.dep_members}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Members Names
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {department.empDepartment ? department.empDepartment : "No Members Entered"}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Descripiton
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {department.dep_desc ? department.dep_desc : "Department Has no Description"}
                                    </span>
                                </li>
                             
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="card h-100">
                    <div className="card-body p-24">
                        <ul
                            className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center px-24 active"
                                    id="pills-edit-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-edit-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-edit-profile"
                                    aria-selected="true"
                                >
                                    Edit Department
                                </button>
                            </li>
                            
                           
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-edit-profile"
                                role="tabpanel"
                                aria-labelledby="pills-edit-profile-tab"
                                tabIndex={0}
                            >
                                <h6 className="text-md text-primary-light mb-16">Department Image</h6>
                                {/* Upload Image Start */}
                                <div className="mb-24 mt-16">
                                    <div className="avatar-upload">
                                        <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                accept=".png, .jpg, .jpeg"
                                                hidden
                                                onChange={readURL}
                                            />
                                            <label
                                                htmlFor="imageUpload"
                                                className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle"
                                            >
                                                <Icon icon="solar:camera-outline" className="icon"></Icon>
                                            </label>
                                        </div>
                                        <div className="avatar-preview">
                                            <div
                                                id="imagePreview"
                                                style={{
                                                    backgroundImage: `url(${imagePreview})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Upload Image End */}
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    Department Name
                                                    <span className="text-danger-600">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control radius-8"
                                                    id="name"
                                                    placeholder={department.dep_name ? department.dep_name : 'Enter Department Name'}
                                                    name='dep_name'
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-sm-6">
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="number"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    No. of Members<span className="text-danger-600">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control radius-8"
                                                    id="number"
                                                    placeholder={department.dep_members? department.dep_members :  "Enter Number of Members"}
                                                    name='dep_members'
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6"> 
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="dep_email"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    Department Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control radius-8"
                                                    id="dep_email"
                                                    name='dep_email'
                                                    placeholder={department.dep_email ? department.dep_email : "Enter Department Email"}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        
                                
                                        <div className="col-sm-12">
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="dep_employees"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    Employees Names
                                                </label>
                                                <textarea
                                                   
                                                    className="form-control radius-8"
                                                    id="dep_employees"
                                                    placeholder={department.empDepartment ? department.empDepartment :"Write Employees Names..."}
                                                    defaultValue={""}
                                                    name='empDepartment'
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="dep_desc"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                   
                                                    className="form-control radius-8"
                                                    id="dep_desc"
                                                    placeholder={ department.dep_desc ? department.dep_desc :  "Write description..."}
                                                    defaultValue={""}
                                                    name='dep_desc'
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <button
                                            type="button"
                                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>



                           
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default EditDepartmentLayer;