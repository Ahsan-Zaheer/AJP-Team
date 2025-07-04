import {useState} from 'react'
import MasterLayout from '../../masterLayout/MasterLayout';
import Breadcrumb from '../../components/Breadcrumb';
import { useAuthStore } from '../../store/authStore';
import { useLeaveStore } from '../../store/leaveStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Loading from '../Loader';


const AddNewLeave = () => {

    const {user} = useAuthStore();
    const {createLeave} = useLeaveStore();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();



    const [formData, setFormData] = useState({
        leaveType: "Casual Leave",
        fromDate: "",
        toDate: "",
        reason: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
    userId: user?.id, // or user.id, depending on your auth
    leaveType: formData.leaveType,
    fromDate: formData.fromDate,
    toDate: formData.toDate,
    reason: formData.reason
    };
    
    setIsLoading(true);
    const success = await createLeave(payload);
    setIsLoading(false);
    if (success) {
        toast.success("Leave created successfully");
        
        navigate("/leaves");
        
    } else {
        toast.error("Error creating leave");
        console.error("Error creating leave");
    }
    }

    if (isLoading) {
        return (
            <MasterLayout>

            <Loading/>

            </MasterLayout>
        )
    }
  return (
    <>
    <MasterLayout>

    <Breadcrumb title="Apply For Leave"/>

    <div className="col-xxl-12">
        <div className="card h-100 radius-8 border-0">
        <div className="card-body p-24">
            <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between ">
            <div className='w-100'>         

                              
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        

                        {/* Leave Type */}
                        <div className="col-sm-12">
                        <div className="mb-20">
                            <label htmlFor="leaveType" className="form-label fw-semibold text-primary-light text-sm mb-8">
                             Leave Type <span className="text-danger-600">*</span>
                            </label>
                            <select
                            name="leaveType"
                            value={formData.leaveType || ""}
                            onChange={handleChange}
                            className="form-control radius-8 form-select"
                            id="leaveType"
                            >
                            <option value="" disabled>Select Your Leave Type</option>
                            
                                <option value="Casual Leave">
                                Casual Leave
                                </option>
                                <option value="Sick Leave">
                                Sick Leave
                                </option>
                                <option value="Annual Leave">
                                Annual Leave
                                </option>
                          
                            </select>
                        </div>
                        </div>

                        {/* From */}
                        <div className="col-sm-6">
                        <div className="mb-20">
                            <label htmlFor="from" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            From Date<span className="text-danger-600">*</span>
                            </label>
                            <input
                            type="date"
                            name="fromDate"
                            //  value={editEmployee?.designation || ""}
                             onChange={handleChange}
                            className="form-control radius-8"
                            id="from"
                            placeholder="Enter Designation Title"
                            />
                        </div>
                        </div>

                        {/* Gender */}
                        <div className="col-sm-6">
                        <div className="mb-20">
                            <label htmlFor="to" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            To Date<span className="text-danger-600">*</span>
                            </label>
                            <input
                            type="date"
                            name="toDate"
                            //  value={editEmployee?.gender || ""}
                             onChange={handleChange}
                            className="form-control radius-8"
                            id="to"
                            >
                            
                            </input>
                        </div>
                        </div>

                        {/* Description */}
                        <div className="col-sm-12">
                        <div className="mb-20">
                            <label htmlFor="leave" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Reason for Leave <span className="text-danger-600">*</span>
                            </label>
                            <textarea
                            name="reason"
                            //  value={editEmployee?.description || ""}
                             onChange={handleChange}
                            className="form-control radius-8"
                            id="leave"
                            placeholder="Write reason..."
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
                        //  disabled={user?.role === "admin" || user?.email == employee?.email  ? false : true} 
                        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8">
                        Apply
                        </button>
                    </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </MasterLayout>
    </>
  )
}

export default AddNewLeave;