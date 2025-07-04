import { Icon } from '@iconify/react/dist/iconify.js'
import {useEffect} from 'react'
import useReactApexChart from '../../hook/useReactApexChart'
import { useDepartmentStore } from '../../store/depStore'
import { useGetDasboardStatsQuery } from '../../redux/slices/api/taskApiSlice';
import Loading from '../../component/Loader';
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';




dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);   

const UnitCountTwo = ({leaves}) => {

    

    

    const today = dayjs().startOf('day');

    const filteredLeaves = leaves.filter(leave => {
        const from = dayjs(leave.fromDate).startOf('day');
        const to = dayjs(leave.toDate).startOf('day');
        return !leave.isTrashed && today.isSameOrAfter(from) && today.isSameOrBefore(to);
    });
       

    const { departments, getDepartments } = useDepartmentStore();
    useEffect(() => {
            getDepartments();
        }, [getDepartments]);

    let { createChart } = useReactApexChart();

    const { data, isLoading } = useGetDasboardStatsQuery();
    
        useEffect(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }, []);
    
        const totals = data?.tasks || [];
    
        if (isLoading)
            return (
            <div className='py-10'>
                <Loading />
            </div>
        );
    
        const stats = [
        {
          _id: "1",
          label: "TOTAL TASK",
          total: data?.totalTasks || 0,
          bg: "bg-[#1d4ed8]",
        },
        {
          _id: "2",
          label: "COMPLETED TASKS",
          total: totals["completed"] || 0,
         
          bg: "bg-[#0f766e]",
        },
        {
          _id: "3",
          label: "TASK IN PROGRESS ",
          total: totals["in progress"] || 0,
          bg: "bg-[#f59e0b]",
        },
        {
          _id: "4",
          label: "TODOS",
          total: totals["todo"],
          bg: "bg-[#be185d]" || 0,
        },
      ];

      
      



    return (
        
        <div className="col-xxl-8">
            <div className="row gy-4">
                <div className="col-xxl-4 col-sm-6">
                    <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-1">
                        <div className="card-body p-0">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="mb-0 w-48-px h-48-px bg-primary-600 flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0">
                                        <Icon
                                            icon="mingcute:user-follow-fill"
                                            className="icon"
                                        />
                                    </span>
                                    <div>
                                        <span className="mb-2 fw-medium text-secondary-light text-sm">
                                            Total Employees
                                        </span>
                                        <h6 className="fw-semibold">{data?.users.length}</h6>
                                    </div>
                                </div>
                                <div
                                    id="new-user-chart"
                                    className="remove-tooltip-title rounded-tooltip-value"
                                >
                                    {/* Pass the color value here */}
                                    {createChart('#487fff')}

                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-sm-6">
                    <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-2">
                        <div className="card-body p-0">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="mb-0 w-48-px h-48-px bg-success-main flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6">
                                        <Icon
                                            icon="mingcute:building-2-fill"
                                            className="icon"
                                        />
                                    </span>
                                    <div>
                                        <span className="mb-2 fw-medium text-secondary-light text-sm">
                                            Total Departments
                                        </span>
                                        <h6 className="fw-semibold">{departments?.departments?.length || ""}
                                        </h6>
                                    </div>
                                </div>
                                <div
                                    id="active-user-chart"
                                    className="remove-tooltip-title rounded-tooltip-value"
                                >
                                    {/* Pass the color value here */}
                                    {createChart('#45b369')}
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-sm-6">
                    <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-3">
                        <div className="card-body p-0">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="mb-0 w-48-px h-48-px bg-yellow text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                        <Icon
                                            icon="mdi:account-multiple-remove"
                                            className="icon"
                                        />
                                    </span>
                                    <div>
                                        <span className="mb-2 fw-medium text-secondary-light text-sm">
                                        Employees on leaves
                                        </span>
                                        <h6 className="fw-semibold">{ filteredLeaves?.length}</h6>
                                    </div>
                                </div>
                                <div
                                    id="total-sales-chart"
                                    className="remove-tooltip-title rounded-tooltip-value"
                                >
                                    {/* Pass the color value here */}
                                    {createChart('#f4941e')}
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>


                {/* <div className="col-xxl-4 col-sm-6">
                    <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-4">
                        <div className="card-body p-0">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="mb-0 w-48-px h-48-px bg-purple text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                        <Icon icon="mdi:account-multiple-check" className="icon" />
                                    </span>
                                    <div>
                                        <span className="mb-2 fw-medium text-secondary-light text-sm">
                                            Today Attendence
                                        </span>
                                        <h6 className="fw-semibold">85%</h6>
                                    </div>
                                </div>
                                <div
                                    id="conversion-user-chart"
                                    className="remove-tooltip-title rounded-tooltip-value"
                                >
                                    
                                    {createChart('#8252e9')}
                                </div>
                            </div>
                            <p className="text-sm mb-0">
                                Increase by{" "}
                                <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                                    +5%
                                </span>{" "}
                                this week
                            </p>
                        </div>
                    </div>
                </div> */}


                <div className="col-xxl-4 col-sm-6">
                    <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-4">
                        <div className="card-body p-0">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="mb-0 w-48-px h-48-px bg-purple text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                        <Icon icon="fa-solid:tasks" className="icon" />
                                    </span>
                                    <div>
                                        <span className="mb-2 fw-medium text-secondary-light pe-5 text-sm">
                                            Total Tasks
                                        </span>
                                        <h6 className="fw-semibold">{stats[0].total}</h6>
                                    </div>
                                </div>
                                <div
                                    id="conversion-user-chart"
                                    className="remove-tooltip-title rounded-tooltip-value"
                                >
                                
                                    {createChart('#8252e9')}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>



                <div className="col-xxl-4 col-sm-6">
                    <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-4">
                        <div className="card-body p-0">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="mb-0 w-48-px h-48-px bg-pink text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                        <Icon icon="mdi:alert" className="icon" />
                                    </span>
                                    <div>
                                        <span className="mb-2 fw-medium text-secondary-light text-sm pe-5">
                                            Pending Tasks
                                        </span>
                                        <h6 className="fw-semibold">{(stats[2].total + stats[3].total)}</h6>
                                    </div>
                                </div>
                                <div
                                    id="leads-chart"
                                    className="remove-tooltip-title rounded-tooltip-value"
                                >
                                    {/* Pass the color value here */}
                                    {createChart('#de3ace')}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-sm-6">
                    <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-6">
                        <div className="card-body p-0">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="mb-0 w-48-px h-48-px bg-cyan text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                        <Icon
                                            icon="lsicon:order-done-filled"
                                            className="icon"
                                        />
                                    </span>
                                    <div>
                                        <span className="mb-2 fw-medium text-secondary-light text-sm">
                                            Completed Tasks
                                        </span>
                                        <h6 className="fw-semibold">{stats[1].total}</h6>
                                    </div>
                                </div>
                                <div
                                    id="total-profit-chart"
                                    className="remove-tooltip-title rounded-tooltip-value"
                                >
                                    {/* Pass the color value here */}
                                    {createChart('#00b8f2')}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnitCountTwo