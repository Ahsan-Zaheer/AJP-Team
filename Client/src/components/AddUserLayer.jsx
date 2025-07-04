import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { useDepartmentStore } from '../store/depStore';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


const AddUserLayer = () => {

    const navigate = useNavigate();

    const { departments, getDepartments} = useDepartmentStore();

    const { register } = useAuthStore();
    

    const [formData, setFormData] = useState({});

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    



    useEffect(()=>{
        getDepartments();
    }, [getDepartments]);

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


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if(name === 'profileImage' ) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }     
    }


    const handleSubmit =  async (e) => {
        e.preventDefault();
    
        console.log("Form Data:", formData);
    
        const formDataToSubmit = new FormData();
        
        Object.keys(formData).forEach((key) => {
            formDataToSubmit.append(key, formData[key]);
        });
    
    
        try {
            const success = await register(formDataToSubmit);
            if (success) {
            toast.success("Employee Created successfully!");
            navigate('/users-grid');
            } else {
            toast.error("Failed to create employee.");
            }
        } catch (error) {
            console.error("Error in form submission:", error);
            toast.error("An error occurred during creating new employee.");
            
        }
    }
    


    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-body p-24">
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                        <div className="card border">
                            <div className="card-body">
                                <h6 className="text-md text-primary-light mb-16">Profile Image</h6>
                                {/* Upload Image Start */}
                                <div className="mb-24 mt-16">
                                    <div className="avatar-upload">
                                        <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                name= "profileImage"
                                                accept=".png, .jpg, .jpeg"
                                                hidden
                                                onChange={(e) => {
                                                    handleImageChange(e);  
                                                    handleChange(e);      
                                                }}
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
                                            htmlFor="name"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Full Name <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control radius-8"
                                            id="name"
                                            name="name"
                                            placeholder="Enter Full Name"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="email"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Email <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control radius-8"
                                            id="email"
                                            name = "email"
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                            required

                                        />
                                    </div>
                                    <div className="mb-20 ">
                                        <label
                                            htmlFor="password"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Password <span className="text-danger-600">*</span>
                                        </label>
                                        <div className="position-relative">
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className="form-control radius-8"
                                            id="password"
                                            name = "password"
                                            onChange={handleChange}
                                            placeholder="Enter Your Password"
                                            required
                                        />
                                        <span
                                            className={`toggle-password ${passwordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                            onClick={togglePasswordVisibility}
                                        ></span>
                                        </div>
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="number"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Phone
                                            <span className="text-danger-600">*</span>{" "}
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control radius-8"
                                            id="number"
                                            name = "phone"
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                            required
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="department"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Department
                                        </label>
                                        <select
                                            className="form-control radius-8 form-select"
                                            id="department"
                                            name = "department"
                                            onChange={handleChange}
                                            defaultValue="Enter Employee Department"
                                        >
                                            <option value="No Department Selected" >
                                                Select Employee Department
                                            </option>
                                            { departments?.departments?.map((department) => (
                                                <option key={department._id} value={department._id}>
                                                    {department.dep_name}
                                                </option>
                                            ))}

                                          
                                        </select>
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="designation"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Designation
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control radius-8"
                                            id="designation"
                                            name = "designation"
                                            onChange={handleChange}
                                            placeholder="Enter Designation Title"
                                        >
                                            
                                        </input>
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="desc"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            className="form-control radius-8"
                                            id="desc"
                                            onChange={handleChange}
                                            placeholder="Write description..."
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

export default AddUserLayer;