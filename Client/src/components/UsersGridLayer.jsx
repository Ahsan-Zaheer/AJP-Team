import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';      
import { useDepartmentStore } from '../store/depStore';
import { useState } from 'react';
import { useDeleteUserMutation } from '../redux/slices/api/userApiSlice';
import { toast } from 'sonner';
import ConfirmatioDialog from '../component/Dialogs';

const UsersGridLayer = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [selected, setSelected] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8); 

    

    const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };




    const [deleteUser] = useDeleteUserMutation();

    const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
    };

    const deleteHandler = async () => {
    try {
      const res = await deleteUser(selected);

     
      getAllEmployees();
      getDepartments();
      toast.success(res?.data?.message);
      setSelected(null);
      setTimeout(() => {
        setOpenDialog(false);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };



     const { getAllEmployees, users, profileImages } = useAuthStore();
            const {departments, getDepartments} = useDepartmentStore();
        
    
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
              getAllEmployees();
              getDepartments();
            }
        }, [getAllEmployees, getDepartments]);

    
        const getDepartmentName = (id) => {
            const deptList =  departments?.departments;
            const dept =  deptList?.find((d) => d._id === id);
            return dept ? dept.dep_name : 'N/A';
        };

        const filteredUsers = users?.filter((user) => {
        const search = searchTerm.toLowerCase();
        return (
            user?.name?.toLowerCase().includes(search) ||
            user?.email?.toLowerCase().includes(search)
        );
        });

        const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
        const paginatedUsers = filteredUsers?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
        );

        


        
    return (
        <>
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <span className="text-md fw-medium text-secondary-light mb-0">Show</span>
                    <select
                    className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1); // Reset to first page when limit changes
                    }}
                    >
                    {[4, 8, 12, 16].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                    </select>

                    <form className="navbar-search">
                        <input
                            type="text"
                            className="bg-base h-40-px w-auto"
                            name="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Icon icon="ion:search-outline" className="icon" />
                    </form>
                </div>
                <Link
                    to="/add-user"
                    className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                >
                    <Icon
                        icon="ic:baseline-plus"
                        className="icon text-xl line-height-1"
                    />
                    Add New User
                </Link>
            </div>
            <div className="card-body p-24">
                <div className="row gy-4">
                {Array.isArray(paginatedUsers) && paginatedUsers.map((user, index) => 
                {    
                    const profileImage = Array.isArray(profileImages) ? profileImages.find((img, idx) => users[idx]?._id === user._id) : null;
                    return (
                    <div className="col-xxl-3 col-md-6 user-grid-card   ">
                    <div className="position-relative border radius-16 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1554034483-04fda0d3507b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhaW4lMjBiYWNrZ3JvdW5kc3xlbnwwfHwwfHx8MA%3D%3D"
                            alt=""
                            className="w-100 object-fit-cover"
                            style={{ height: "100px" }}
                        />
                        <div className="dropdown position-absolute top-0 end-0 me-16 mt-16">
                            <button
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                className="bg-white-gradient-light w-32-px h-32-px radius-8 border border-light-white d-flex justify-content-center align-items-center text-white"
                            >
                                <Icon
                                    icon="entypo:dots-three-vertical"
                                    className="icon "
                                />
                            </button>
                            <ul className="dropdown-menu p-12 border bg-base shadow">
                                <li>
                                    <Link
                                        className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10"
                                        to={`/view-profile/${user._id}`}
                                    >
                                        Edit
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="delete-btn dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-danger-100 text-hover-danger-600 d-flex align-items-center gap-10"
                                        onClick={() => deleteClick(user?._id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="ps-16 pb-16 pe-16 text-center mt--50">
                            
                            <img
                                src={
                                    profileImage && profileImage !== "http://localhost:5000/"
                                        ? profileImage
                                        : "assets/images/user-grid/user-grid-img1.png"
                                    }
                                alt=""
                                className="border br-white border-width-2-px w-100-px h-100-px rounded-circle object-fit-cover"
                            />
                            <h6 className="text-lg mb-0 mt-4">{user?.name}</h6>
                            <span className="text-secondary-light mb-16">
                                {user?.email}
                            </span>
                            <div className="center-border position-relative bg-danger-gradient-light radius-8 p-12 d-flex align-items-center gap-4">
                                <div className="text-center w-50">
                                    <h6 className="text-md mb-0">{getDepartmentName(user?.department)}</h6>
                                    <span className="text-secondary-light text-sm mb-0">
                                        Department
                                    </span>
                                </div>
                                <div className="text-center w-50">
                                    <h6 className="text-md mb-0">{user?.designation}</h6>
                                    <span className="text-secondary-light text-sm mb-0">
                                        Designation
                                    </span>
                                </div>
                            </div>
                            <Link
                                to={`/view-profile/${user._id}`}
                                className="bg-primary-50 text-primary-600 bg-hover-primary-600 hover-text-white p-10 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center justify-content-center mt-16 fw-medium gap-2 w-100"
                            >
                                View Profile
                                <Icon
                                    icon="solar:alt-arrow-right-linear"
                                    className="icon text-xl line-height-1"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                )}
                )}
                    
                    
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                    <span>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredUsers?.length)} of{" "}
                    {filteredUsers?.length} entries
                    </span>

                    <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                        <li className="page-item">
                            <button
                            onClick={() => handlePageClick(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px"
                            >
                            <Icon icon="ep:d-arrow-left" />
                            </button>
                        </li>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className="page-item">
                            <button
                                onClick={() => handlePageClick(i + 1)}
                                className={`page-link fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md ${
                                currentPage === i + 1
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-neutral-200 text-secondary-light'
                                }`}
                            >
                                {i + 1}
                            </button>
                            </li>
                        ))}

                        <li className="page-item">
                            <button
                            onClick={() => handlePageClick(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px"
                            >
                            <Icon icon="ep:d-arrow-right" />
                            </button>
                        </li>
                    </ul>

                </div>
            </div>
        </div>

        <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

        </>

    );
};

export default UsersGridLayer;