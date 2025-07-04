import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuthStore } from '../../store/authStore';
import { toast } from "sonner";
import { useLeaveStore } from '../../store/leaveStore';
import { useNavigate } from 'react-router-dom';

const LeaveModal = ({ isOpen, onClose, leave }) => {
    const { user } = useAuthStore();
    const { updateLeave } = useLeaveStore();
    const navigate = useNavigate();
    

    if (!leave) return null;

    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const getDaysCount = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    const changeStatus = async (leaveId, status) => {
        try {
            
            
            const success = await updateLeave(leaveId, status);
            if (success) {
                toast.success("Leave updated successfully");
                onClose(); 
                navigate("/leaves"); // Redirect to leaves page after update
            } else {
                toast.error("Failed to update leave");
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };

    const DetailRow = ({ label, value, action, leave }) => (
        <div
            className="d-flex justify-content-between align-items-center mb-2"
            style={{ padding: '0.25rem 0.5rem' }}
        >
            <strong style={{ color: '#6c757d' }}>{label}:</strong>
            {action ? (
                <div className='d-flex gap-2 ms-auto'>
                    <button
                        className="btn btn-sm btn-success"
                        onClick={() => changeStatus(leave._id, 'Approved')}
                    >
                        Approve
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => changeStatus(leave._id, 'Rejected')}
                    >
                        Reject
                    </button>
                </div>
            ) : (
                <span style={{ color: '#343a40' }}>{value}</span>
            )}
        </div>
    );

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" onClose={onClose}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="fade"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="fade"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="modal-backdrop fade show"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1040,
                        }}
                    />
                </Transition.Child>

                {/* Modal */}
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ zIndex: 1050 }}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="fade"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="fade"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel
                            className="modal-dialog modal-dialog-centered"
                            style={{ maxWidth: '500px', width: '100%' }}
                        >
                            <div className="modal-content p-3">
                                <div className="modal-header">
                                    <Dialog.Title as="h5" className="modal-title">
                                        Leave Details
                                    </Dialog.Title>
                                    <button type="button" className="btn-close" onClick={onClose}></button>
                                </div>

                                <div className="modal-body" style={{ backgroundColor: '#f9f9f9' }}>
                                    <DetailRow label="Leave Type" value={leave.leaveType} />
                                    <DetailRow label="From" value={getFormattedDate(leave.fromDate)} />
                                    <DetailRow label="To" value={getFormattedDate(leave.toDate)} />
                                    <DetailRow label="Applied On" value={getFormattedDate(leave.appliedAt)} />
                                    <DetailRow
                                        label="Total Days"
                                        value={`${getDaysCount(leave.fromDate, leave.toDate)} day(s)`}
                                    />
                                    <DetailRow label="Reason" value={leave.reason} />

                                    {user?.role === 'admin' && leave.status === "Pending" ? (
                                        <DetailRow label="Status" action={true} leave={leave} />
                                    ) : (
                                        leave.status && <DetailRow label="Status" value={leave.status} />
                                    )}
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ minWidth: '100px' }}
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default LeaveModal;
