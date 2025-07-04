import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartmentLayer = () => {

    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const navigate = useNavigate();


    const [department, setDepartment] = useState({
        dep_name: '',
        dep_members: '',
        empDepartment: '',
        dep_email: '',
        dep_desc: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setDepartment({...department, [name]: value});
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('http://localhost:5000/api/department/add', department, {
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



    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-body p-24">
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                        <div className="card border">
                            <div className="card-body">
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
                                                onChange={handleImageChange}
                                            />
                                            <label
                                                htmlFor="imageUpload"
                                                className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle">
                                                <Icon icon="solar:camera-outline" className="icon"></Icon>
                                            </label>
                                        </div>
                                        <div className="avatar-preview">
                                            <div
                                                id="imagePreview"
                                                style={{
                                                    backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : '',

                                                }}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Upload Image End */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="dep_name"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Department Name <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control radius-8"
                                            id="dep_name"
                                            placeholder="Enter Department Name"
                                            name="dep_name"
                                            onChange={handleChange}
                                        />
                                    </div>
                                   
                                    <div className="mb-20">
                                        <label
                                            htmlFor="dep_members"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            No. of Members <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control radius-8"
                                            id="dep_members"
                                            placeholder="Enter Total Members"
                                            name="dep_members"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="dep_email"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Department Email (optional)
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control radius-8"
                                            id="dep_email"
                                            placeholder="Enter Department Email"
                                            name="dep_email"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    
                                    <div className="mb-20">
                                        <label
                                            htmlFor="empDepartment"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Employees Names (optional)
                                        </label>
                                        <textarea
                                            name="empDepartment"
                                            className="form-control radius-8"
                                            id="empDepartment"
                                            placeholder="Write Employees Names..."
                                            onChange={handleChange}
                                            defaultValue={""}
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="dep_desc"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            name="dep_desc"
                                            className="form-control radius-8"
                                            id="desc"
                                            placeholder="Write description..."
                                            onChange={handleChange}
                                            defaultValue={""}
                                        />
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

export default AddDepartmentLayer;