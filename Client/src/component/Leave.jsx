import { Icon } from '@iconify/react/dist/iconify.js';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useLeaveStore } from '../store/leaveStore';
import { useAuthStore } from '../store/authStore';
import LeaveModal from './leave/LeaveModal';
import { toast } from "sonner";

const Leave = () => {
    const {user, users, getAllEmployees} = useAuthStore();
    const {leave, leaves, getLeaves, getLeave, deleteLeave} = useLeaveStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });


    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);

    const handleViewClick = (leave) => {
        setSelectedLeave(leave);
        setIsOpen(true);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        if (user?.role === 'admin') {
            getLeaves(); 
        } else {
            getLeave(user?.id); 
        }
    }, [user?.role, getLeaves, getLeave]);

    useEffect(() => {
        getAllEmployees();
    }, []);

    


    


    useEffect(() => {
        const allLeaves = user?.role === 'admin'
            ? leaves?.filter(l => !l.isTrashed)
            : leave?.filter(l => !l.isTrashed);

        if (allLeaves?.length) {
            setFilteredLeaves(allLeaves);
        }
    }, [leave, leaves, user?.role]);





    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const list = (user?.role === 'admin' ? leaves : leave)?.filter(l => !l.isTrashed);


        if (!value) {
            setFilteredLeaves(list || []);
            return;
        }

        const filtered = list.filter((leave) => {
            const leaveTypeMatch = leave.leaveType.toLowerCase().includes(value);

            const fromDate = new Date(leave.fromDate).toLocaleDateString('en-GB').toLowerCase();
            const toDate = new Date(leave.toDate).toLocaleDateString('en-GB').toLowerCase();
            const appliedAt = new Date(leave.appliedAt).toLocaleDateString('en-GB').toLowerCase();

            const dateMatch =
                fromDate.includes(value) ||
                toDate.includes(value) ||
                appliedAt.includes(value);

            return leaveTypeMatch || dateMatch;
        });

        setFilteredLeaves(filtered);
    };



    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-GB'); // or 'en-US' for US format
    };

    // SORT
    const sortedLeaves = React.useMemo(() => {
        if (!sortConfig.key) return filteredLeaves;

        return [...filteredLeaves].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (typeof aValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else {
                return sortConfig.direction === 'asc'
                    ? aValue - bValue
                    : bValue - aValue;
            }
        });
    }, [filteredLeaves, sortConfig]);

    // PAGINATE
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentLeaves = sortedLeaves.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredLeaves.length / rowsPerPage);

    const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
    }
    };

    const handleStatusFilter = (e) => {
        const status = e.target.value;

        const filtered = leave
        .filter(l => !l.isTrashed)
        .filter(l => l.status.toLowerCase() === status.toLowerCase());

        setFilteredLeaves(filtered);
        setCurrentPage(1);
    };


    const getEmployeeName = (id) => {
        const employee = users?.find((user) => user._id === id);
        
        return employee ? `${employee.name}` : 'Unknown';
    };

    const truncateWords = (text, limit = 5) => {
        return text.split(" ").slice(0, limit).join(" ") + (text.split(" ").length > limit ? "..." : "");
    };


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this leave?")) {
            try {
                await deleteLeave(id);
                toast.success("Leave deleted successfully");
            } catch (error) {
                console.error("Error deleting leave:", error);
                toast.error("Failed to delete leave");
            }
        }
    }


   
    










  return (
    <>
    <div className="card">
                <div className="card-header d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
                    <div className="d-flex flex-column flex-sm-row gap-2 w-100">
                        <div className="d-flex align-items-center gap-2">
                            <span>Show</span>
                            <select
                                className="form-select form-select-sm w-auto"
                                defaultValue="Select Number"
                                onChange={(e) => {
                                    setRowsPerPage(parseInt(e.target.value));
                                    setCurrentPage(1); // reset to page 1
                                }}
                            >
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
                                name="#0"
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
                    <div className="d-flex flex-column flex-sm-row gap-2 w-100 justify-content-sm-end">
                        <select className="form-select form-select-sm w-auto" onChange={handleStatusFilter} defaultValue="Select Status">
                            <option value="Select Status" disabled>
                                Select Status
                            </option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <Link to="/add-new-leave" className="btn btn-sm btn-primary-600">
                            <i className="ri-add-line" /> Apply For Leave
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                    <table className="table bordered-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div className="form-check style-check d-flex align-items-center">
                                        
                                        <div className="form-check-label" >
                                            S.L
                                        </div>
                                    </div>
                                </th>
                                <th scope="col">Leave Type</th>
                                <th scope="col">Employee Name</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Reason</th>
                                <th scope="col">Applied Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentLeaves?.map((leave, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="form-check style-check d-flex align-items-center">
                                                    
                                                    <div className="form-check-label" >
                                                        0{++index}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    
                                                    <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                                        {leave.leaveType}
                                                    </h6>
                                                </div>
                                            </td>
                                            <td>{getEmployeeName(leave.userId)}</td>
                                            <td>{formatDate(leave.fromDate)}</td>
                                            <td>{formatDate(leave.toDate)}</td>
                                            <td>{truncateWords(leave.reason)}</td>
                                            <td>{formatDate(leave.appliedAt)}</td>

                                            <td>
                                                {" "}
                                                <span className={`${leave.status === "Approved" && 'bg-success-focus text-success-main'} ${leave.status === "Rejected" && 'bg-danger-focus text-danger-main'}  ${leave.status === "Pending" && 'bg-warning-focus text-warning-main'} px-24 py-4 rounded-pill fw-medium text-sm`}>
                                                    {leave.status}
                                                </span>
                                            </td>
                                            
    
                                            <td>
                                                 <button
                                                     onClick={() => handleViewClick(leave)}
                                                     className="w-32-px h-32-px  me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center         justify-content-center"
                                                 >
                                                     <Icon icon="iconamoon:eye-light" />
                                                 </button>

                                                 <button
                                                     onClick={() => handleDelete(leave._id)}
                                                     className="w-32-px h-32-px  me-8 bg-danger-focus text-danger-600 rounded-circle d-inline-flex align-items-center      justify-content-center"
                                                 >
                                                     <Icon icon="ion:trash-outline" />
                                                 </button>
                                                 
                                            </td>
                                        </tr>
                                                        
                                                        
                            ))}
                            
                        
                        </tbody>
                    </table>
                    </div>
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mt-24 text-center">
                        <span>
                            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                            {Math.min(currentPage * rowsPerPage, filteredLeaves.length)} of{" "}
                            {filteredLeaves.length} entries
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

            <LeaveModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                leave={selectedLeave}
            />

            {console.log("Modal Open State:", isOpen)}


            </>
  )
}

export default Leave;