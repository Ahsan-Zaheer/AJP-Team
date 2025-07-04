import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDepartmentStore } from '../store/depStore';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

const ViewProfileLayer = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const employee = useAuthStore(state => state.employee);
    const user = useAuthStore(state => state.user);
    const getEmployee = useAuthStore(state => state.getEmployee);
    const profileImages = useAuthStore(state => state.profileImages);
    const updateEmployee = useAuthStore(state => state.updateEmployee);
    const changePassword = useAuthStore(state => state.changePassword);   
    const {departments, department, getDepartment, getDepartments} = useDepartmentStore();

    const [editEmployee, setEditEmployee] = useState({} );


    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

     const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
        toast.error("Please fill in all fields.");
        return;
        }

        if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
        }

        const success = await changePassword(employee?._id, newPassword);
        if (success) {
        toast.success("Password changed successfully.");
        setNewPassword('');
        setConfirmPassword('');
        } else {
        toast.error("Failed to change password.");
        }
    };

    const [imagePreviewUrl, setImagePreviewUrl] = useState('/assets/images/user-grid/user-grid-img13.png');

   

    const handleChange = (e) => {
            const { name, value, files} = e.target;

            if(name === 'profileImage' ) {
            setEditEmployee((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setEditEmployee((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } 
        }


        
       useEffect(() => {
        let isMounted = true;
        const token = localStorage.getItem("token");
        if (token) {
        getEmployee(id);
        }
        return () => {
            isMounted = false; // cleanup
        };
        }, [getEmployee, id]);

        
        useEffect(() => {
            if (employee) {
                setEditEmployee({
                    name: employee?.name || "",
                    email: employee?.email || "",
                    phone: employee?.phone || "",
                    department: employee?.department || "",
                    description: employee?.description || "",
                    designation: employee?.designation || "",
                    gender: employee?.gender || "",
                });
            }
        }, [employee]);



        useEffect(() => {
            const token = localStorage.getItem("token");
            if (token && employee?.department) {
                getDepartment(employee.department);
            }
        }, [employee?.department, getDepartment]);

    


    
        const handleSubmit = async (e) => {
            e.preventDefault();

            console.log("Edit Form Data:", editEmployee);

            const formDataToSubmit = new FormData();

            Object.keys(editEmployee).forEach((key) => {
                formDataToSubmit.append(key, editEmployee[key]);
            });


            try {

                const success = await updateEmployee(id, formDataToSubmit)
                if (success) {
                toast.success("Employee updated successfully!"); // ✅ Show toast
                } else {
                toast.error("Failed to update employee.");
                }
                
            } catch (error) {
                console.error("Error submitting form:", error);
                toast.error("An error occurred during update.");
                
            }
        }
    

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Toggle function for password field
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Toggle function for confirm password field
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const readURL = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviewUrl(e.target.result);
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    };

     useEffect(()=>{
            getDepartments();
        }, [getDepartments])


  





    return (
        <div className="row gy-4">
            <div className="col-lg-4">
                <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
                    <img
                        src="https://images.unsplash.com/photo-1554034483-04fda0d3507b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhaW4lMjBiYWNrZ3JvdW5kc3xlbnwwfHwwfHx8MA%3D%3D"
                        alt=""
                        className="w-100 object-fit-cover"
                        style={{ height: "150px" }}
                    />
                    <div className="pb-24 ms-16 mb-24 me-16  mt--100">
                        <div className="text-center border border-top-0 border-start-0 border-end-0">
                            <img
                                src= {`${profileImages === null  ? "/assets/images/user-grid/user-grid-img14.png" : profileImages}`}
                                alt=""
                                className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
                            />
                            <h6 className="mb-0 mt-16">{employee?.name}</h6>
                            <span className="text-secondary-light mb-16">{employee?.email}</span>
                        </div>
                        <div className="mt-24">
                            <h6 className="text-xl mb-16">Personal Info</h6>
                            <ul>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        Full Name
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {employee?.name}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Email
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {employee?.email}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Phone Number
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {employee?.phone}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Department
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {department?.dep_name}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Designation
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {employee?.designation}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Gender
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {employee?.gender}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Bio
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {employee?.description}
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
                                    Edit Profile
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center px-24"
                                    id="pills-change-passwork-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-change-passwork"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-change-passwork"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    Change Password
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center px-24"
                                    id="pills-notification-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-notification"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-notification"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    Notification Settings
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
                                                    readURL(e);
                                                    handleChange(e);
                                                }}
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
                                                    backgroundImage: `url(${imagePreviewUrl})`,
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
                                    {/* Full Name */}
                                    <div className="col-sm-6">
                                    <div className="mb-20">
                                        <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Full Name <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                        type="text"
                                        name="name"
                                        value={editEmployee?.name || ""}
                                        onChange={handleChange}
                                        className="form-control radius-8"
                                        id="name"
                                        placeholder="Enter Full Name"
                                        />
                                    </div>
                                    </div>

                                    {/* Email */}
                                    <div className="col-sm-6">
                                    <div className="mb-20">
                                        <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Email <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                        type="email"
                                        name="email"
                                        value={editEmployee?.email || ""}
                                        onChange={handleChange}
                                        className="form-control radius-8"
                                        id="email"
                                        placeholder="Enter email address"
                                        />
                                    </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="col-sm-6">
                                    <div className="mb-20">
                                        <label htmlFor="phone" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Phone
                                        </label>
                                        <input
                                        type="number"
                                        name="phone"
                                        value={editEmployee?.phone || ""}
                                        onChange={handleChange}
                                        className="form-control radius-8"
                                        id="phone"
                                        placeholder="Enter phone number"
                                        />
                                    </div>
                                    </div>

                                    {/* Department */}
                                    <div className="col-sm-6">
                                    <div className="mb-20">
                                        <label htmlFor="department" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Department <span className="text-danger-600">*</span>
                                        </label>
                                        <select
                                        name="department"
                                        value={editEmployee?.department || ""}
                                        onChange={handleChange}
                                        className="form-control radius-8 form-select"
                                        id="department"
                                        >
                                        <option value="" disabled>Select Your Department</option>
                                        {departments?.departments?.map(department => (
                                            <option key={department._id} value={department._id}>
                                            {department.dep_name}
                                            </option>
                                        ))}
                                        </select>
                                    </div>
                                    </div>

                                    {/* Designation */}
                                    <div className="col-sm-6">
                                    <div className="mb-20">
                                        <label htmlFor="designation" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Designation <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                        type="text"
                                        name="designation"
                                        value={editEmployee?.designation || ""}
                                        onChange={handleChange}
                                        className="form-control radius-8"
                                        id="designation"
                                        placeholder="Enter Designation Title"
                                        />
                                    </div>
                                    </div>

                                    {/* Gender */}
                                    <div className="col-sm-6">
                                    <div className="mb-20">
                                        <label htmlFor="gender" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Gender <span className="text-danger-600">*</span>
                                        </label>
                                        <select
                                        name="gender"
                                        value={editEmployee?.gender || ""}
                                        onChange={handleChange}
                                        className="form-control radius-8 form-select"
                                        id="gender"
                                        >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Rather Not Say">Rather Not Say</option>
                                        </select>
                                    </div>
                                    </div>

                                    {/* Description */}
                                    <div className="col-sm-12">
                                    <div className="mb-20">
                                        <label htmlFor="description" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Description
                                        </label>
                                        <textarea
                                        name="description"
                                        value={editEmployee?.description || ""}
                                        onChange={handleChange}
                                        className="form-control radius-8"
                                        id="description"
                                        placeholder="Write description..."
                                        />
                                    </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="d-flex align-items-center justify-content-center gap-3">
                                    <button type="button" className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8">
                                    Cancel
                                    </button>
                                    <button 
                                    type="submit"
                                    disabled={user?.role === "admin" || user?.email == employee?.email  ? false : true} 
                                    className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8">
                                    Save
                                    </button>
                                </div>
                            </form>


                            </div>
                            <div className="tab-pane fade" id="pills-change-passwork" role="tabpanel" aria-labelledby="pills-change-passwork-tab" tabIndex="0">
                                <div className="mb-20">
                                    <label htmlFor="your-password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        New Password <span className="text-danger-600">*</span>
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className="form-control radius-8"
                                            id="your-password"
                                            placeholder="Enter New Password*"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <span
                                            className={`toggle-password ${passwordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                            onClick={togglePasswordVisibility}
                                        ></span>
                                    </div>
                                </div>

                                <div className="mb-20">
                                    <label htmlFor="confirm-password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Confirm Password <span className="text-danger-600">*</span>
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type={confirmPasswordVisible ? "text" : "password"}
                                            className="form-control radius-8"
                                            id="confirm-password"
                                            placeholder="Confirm Password*"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <span
                                            className={`toggle-password ${confirmPasswordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                            onClick={toggleConfirmPasswordVisibility}
                                        ></span>
                                    </div>
                                </div>
                                <div className="text-start">
                                    <button 
                                    className="btn btn-primary px-20 radius-8" 
                                    disabled={user?.role === "admin" || user?.email == employee?.email  ? false : true} 
                                    onClick={handleChangePassword}>
                                    Change Password
                                    </button>
                                </div>
                                </div>
                            <div
                                className="tab-pane fade"
                                id="pills-notification"
                                role="tabpanel"
                                aria-labelledby="pills-notification-tab"
                                tabIndex={0}
                            >
                                <div className="form-switch switch-primary py-12 px-16 border radius-8 position-relative mb-16">
                                    <label
                                        htmlFor="companzNew"
                                        className="position-absolute w-100 h-100 start-0 top-0"
                                    />
                                    <div className="d-flex align-items-center gap-3 justify-content-between">
                                        <span className="form-check-label line-height-1 fw-medium text-secondary-light">
                                            Company News
                                        </span>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="companzNew"
                                        />
                                    </div>
                                </div>
                                <div className="form-switch switch-primary py-12 px-16 border radius-8 position-relative mb-16">
                                    <label
                                        htmlFor="pushNotifcation"
                                        className="position-absolute w-100 h-100 start-0 top-0"
                                    />
                                    <div className="d-flex align-items-center gap-3 justify-content-between">
                                        <span className="form-check-label line-height-1 fw-medium text-secondary-light">
                                            Push Notification
                                        </span>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="pushNotifcation"
                                            defaultChecked=""
                                        />
                                    </div>
                                </div>
                                <div className="form-switch switch-primary py-12 px-16 border radius-8 position-relative mb-16">
                                    <label
                                        htmlFor="weeklyLetters"
                                        className="position-absolute w-100 h-100 start-0 top-0"
                                    />
                                    <div className="d-flex align-items-center gap-3 justify-content-between">
                                        <span className="form-check-label line-height-1 fw-medium text-secondary-light">
                                            Weekly News Letters
                                        </span>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="weeklyLetters"
                                            defaultChecked=""
                                        />
                                    </div>
                                </div>
                                <div className="form-switch switch-primary py-12 px-16 border radius-8 position-relative mb-16">
                                    <label
                                        htmlFor="meetUp"
                                        className="position-absolute w-100 h-100 start-0 top-0"
                                    />
                                    <div className="d-flex align-items-center gap-3 justify-content-between">
                                        <span className="form-check-label line-height-1 fw-medium text-secondary-light">
                                            Meetups Near you
                                        </span>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="meetUp"
                                        />
                                    </div>
                                </div>
                                <div className="form-switch switch-primary py-12 px-16 border radius-8 position-relative mb-16">
                                    <label
                                        htmlFor="orderNotification"
                                        className="position-absolute w-100 h-100 start-0 top-0"
                                    />
                                    <div className="d-flex align-items-center gap-3 justify-content-between">
                                        <span className="form-check-label line-height-1 fw-medium text-secondary-light">
                                            Orders Notifications
                                        </span>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="orderNotification"
                                            defaultChecked=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ViewProfileLayer;