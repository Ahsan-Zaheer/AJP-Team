import UnitCountTwo from './child/UnitCountTwo'
import { Icon } from '@iconify/react/dist/iconify.js'
import RevenueGrowthOne from './child/RevenueGrowthOne'
import EarningStaticOne from './child/EarningStaticOne'
import CampaignStaticOne from './child/CampaignStaticOne'
import ClientPaymentOne from './child/ClientPaymentOne'
import { useEffect } from 'react'
import TopPerformanceOne from './child/TopperformanceOne'
import LatestPerformanceOne from './child/LatestPerformanceOne'
import LastTransactionOne from './child/LastTransactionOne'
import styles from '../stylesheets/admin.module.css'
import { Chart } from '../component/Chart';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import clsx from "clsx";
import moment from "moment";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils/helper";
import { UserInfo } from '../component/UserInfo';
import { useGetDasboardStatsQuery } from '../redux/slices/api/taskApiSlice';
import Loading from '../component/Loader';
import { useLeaveStore } from '../store/leaveStore';


const DashBoardLayerTwo = () => {
    const {leaves, getLeaves} = useLeaveStore();

    useEffect(() => {
        getLeaves();
    }, []);
    const leavesApplied = leaves.filter(leave => !leave.isTrashed).length;

    const leavesApproved = leaves.filter(leave => !leave.isTrashed && leave.status === "Approved").length;

    const leavesPending = leaves.filter(leave => !leave.isTrashed && leave.status === "Pending").length;

    const leavesRejected = leaves.filter(leave => !leave.isTrashed && leave.status === "Rejected").length;

    
    const { data, isLoading, error } = useGetDasboardStatsQuery();
    
        if (isLoading)
                return (
                <div className='py-10'>
                    <Loading />
                </div>
        );
    
    
        const TaskTable = ({ tasks }) => {
            const ICONS = {
                high: <MdKeyboardDoubleArrowUp />,
                medium: <MdKeyboardArrowUp />,
                low: <MdKeyboardArrowDown />,
            };
    
            const TableHeader = () => (
                <thead className='border-b border-gray-300 '>
                <tr className='text-black text-left'>
                    <th className='py-2'>Task Title</th>
                    <th className='py-2'>Priority</th>
                    <th className='py-2'>Team</th>
                    <th className='py-2 hidden md:block'>Created At</th>
                </tr>
                </thead>
            );
    
            const TableRow = ({ task }) => (
                <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
                <td className='py-2 pe-5'>
                    <div className='d-flex align-items-center gap-2'>
                    <div
                        className={clsx("w-4 h-4 rounded-circle", TASK_TYPE[task.stage])}
                        style={{ width: "20px", height: "20px" }}
                    />
    
                    <p className='text-base text-black m-0'>{task.title}</p>
                    </div>
                </td>
    
                <td className='py-2 pe-5'>
                    <div className='d-flex gap-1 align-items-center'>
                        <span className={clsx("d-flex align-items-center", PRIOTITYSTYELS[task.priority])}>
    
                        {ICONS[task.priority]}
                        </span>
                    
                    
                    <span className='capitalize'>{task.priority}</span>
                    </div>
                </td>
    
                <td className='py-2 pe-5'>
                    <div className='d-flex'>
                    {task.team.map((m, index) => (
                        <div
                        key={index}
                        className={clsx(
                            "rounded-circle text-light d-flex align-items-center justify-content-center text-sm -mr-1",
                            BGS[index % BGS.length]
                        )}
                        style={{ width: "25px", height: "25px" }}
                        >
                        <UserInfo user={m} />
                        </div>
                    ))}
                    </div>
                </td>
                <td className='py-2 hidden md:block'>
                    <span className=' text-gray-600'>
                    {moment(task?.date).fromNow()}
                    </span>
                </td>
                </tr>
            ); 
             
                    return (
                    <>
                    <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded-circle'>
                        <table className='w-full'>
                        <TableHeader />
                        <tbody>
                            {tasks?.map((task, id) => (
                            <TableRow key={id} task={task} />
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </>
                );
                };
    
    
    
                const UserTable = ({ users }) => {
                    const TableHeader = () => (
                        <thead className="table-light">
                        <tr>
                            <th scope="col">Full Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Created At</th>
                        </tr>
                        </thead>
                    );
    
                    const TableRow = ({ user }) => (
                        <tr>
                        <td>
                            <div className="d-flex align-items-center gap-2">
                            <div
                                className="rounded-circle text-white d-flex align-items-center justify-content-center bg-primary"
                                style={{ width: "36px", height: "36px", fontSize: "14px" }}
                            >
                                <span>{getInitials(user?.name)}</span>
                            </div>
    
                            <div>
                                <p className="mb-0">{user.name}</p>
                                <small className="text-muted">{user?.designation}</small>
                            </div>
                            </div>
                        </td>
    
                        <td>
                            <span
                            className={`badge rounded-pill ${
                                "bg-primary-subtle text-primary" 
                            }`}
                            >
                            {user?.role}
                            </span>
                        </td>
    
                        <td>
                            <small className="text-muted">{moment(user?.createdAt).fromNow()}</small>
                        </td>
                        </tr>
                    );
    
                    return (
                       
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                            <table className="table table-hover mb-0">
                                <TableHeader />
                                <tbody>
                                {users?.map((user, index) => (
                                    <TableRow key={index + user?._id} user={user} />
                                ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                       
                    );
                    };
   

  return (
    <section className="row gy-4">

      {/* UnitCountTwo */}
      <UnitCountTwo leaves={leaves}/> 

      {/* RevenueGrowthOne */}
      <RevenueGrowthOne />


      <div className="col-xxl-12 col-xl-12">
                          <div className="card h-100">
                              <div className="card-body">
                                  <div className="d-flex flex-wrap align-items-center justify-content-between mb-20">
                                      <h6 className="text-lg mb-0">Tasks By Priority</h6>
                                      
                                  </div>
                                  <Chart data={data?.graphData} />
                              </div>
                          </div>
                      </div>
      
      
      
                      <div className="col-xl-7">
                          <div className="card h-100">
                              <div className="card-body">
                                  <div className="d-flex flex-wrap align-items-center justify-content-between mb-20">
                                      <h6 className="text-lg mb-0">Recent Tasks</h6>
                                      
                                  </div>
                                  <TaskTable tasks={data?.last10Task} />
                              </div>
                          </div>
                      </div>
      
                      <div className="col-xl-5">
                         
                          <UserTable users={data?.users} />
                                  
                      </div> 


    

       
    <div className="col-xxl-8">
                  <div className="card h-100 radius-8 border-0">
                      <div className="card-body p-24">
                          <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between ">
                              <div className='w-100'>
                                  <h6 className="mb-2 fw-bold text-lg">Leave Management</h6>

                                  <span className="text-sm fw-medium text-secondary-light mb-3">
                                      Approve & Reject leaves of your employees
                                  </span>
                                  <div className="row mt-24 gy-0">
                                       <div className="col-xxl-6 col-sm-6 pe-0 ps-0">
                                           <div className="card-body p-20 bg-base border h-100 d-flex flex-column justify-content-center border-end-0">
                                               <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                                   <div>
                                                       <span className="mb-12 w-44-px h-44-px text-primary-600 bg-primary-light border border-primary-light-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6 mb-12">
                                                           <Icon icon="fa-solid:box-open" className="icon" />
                                                       </span>
                                                       <span className="mb-1 fw-medium text-secondary-light text-md">
                                                           Leaves Applied
                                                       </span>
                                                       <h6 className="fw-semibold text-primary-light mb-1">{leavesApplied}</h6>
                                                   </div>
                                               </div>
                                               
                                           </div>
                                       </div>
                                       <div className="col-xxl-6 col-sm-6 ps-0">
                                           <div className="card-body p-20 bg-base border h-100 d-flex flex-column justify-content-center">
                                               <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                                   <div>
                                                       <span className="mb-12 w-44-px h-44-px text-success bg-success-100 border border-green-light-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6 mb-12">
                                                           <Icon
                                                               icon="duo-icons:approved"
                                                               className="icon"
                                                           />
                                                       </span>
                                                       <span className="mb-1 fw-medium text-secondary-light text-md">
                                                           Leaves Approved
                                                       </span>
                                                       <h6 className="fw-semibold text-primary-light mb-1">{leavesApproved}</h6>
                                                   </div>
                                               </div>
                                              
                                           </div>
                                       </div>
                                       <div className="col-xxl-6 col-sm-6 px-0">
                                           <div className="card-body p-20 bg-base border h-100 d-flex flex-column justify-content-center border-end-0">
                                               <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                                   <div>
                                                       <span className="mb-12 w-44-px h-44-px text-lilac bg-lilac-light border border-lilac-light-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6 mb-12">
                                                           <Icon
                                                               icon="ic:twotone-pending-actions"
                                                               className="icon"
                                                           />
                                                       </span>
                                                       <span className="mb-1 fw-medium text-secondary-light text-md">
                                                           Leave Pending
                                                       </span>
                                                       <h6 className="fw-semibold text-primary-light mb-1">{leavesPending}</h6>
                                                   </div>
                                               </div>
                                               
                                           </div>
                                       </div>
                                       <div className="col-xxl-6 col-sm-6 ps-0">
                                           <div className="card-body p-20 bg-base border h-100 d-flex flex-column justify-content-center">
                                               <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                                   <div>
                                                       <span className="mb-12 w-44-px h-44-px text-danger bg-danger-100 border border-danger-light-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6 mb-12">
                                                           <Icon
                                                               icon="line-md:close-circle-filled"
                                                               className="icon"
                                                           />
                                                       </span>
                                                       <span className="mb-1 fw-medium text-secondary-light text-md">
                                                           Leaves Rejected
                                                       </span>
                                                       <h6 className="fw-semibold text-primary-light mb-1">
                                                           {leavesRejected}
                                                       </h6>
                                                   </div>
                                               </div>
                                              
                                           </div>
                                       </div>
                                   </div>

                              </div>

                             
                          </div>
                         
                         
                      </div>
                  </div>
        </div>

    {/* TopPerformanceOne */}
      <TopPerformanceOne />


    

      

      {/* EarningStaticOne */}
      {/* <EarningStaticOne /> */}

      {/* CampaignStaticOne */}
      {/* <CampaignStaticOne /> */}

      {/* ClientPaymentOne  */}
      {/* <ClientPaymentOne /> */}

    

     
      

      {/* LatestPerformanceOne */}
      {/* <LatestPerformanceOne /> */}

      {/* LastTransactionOne */}
      {/* <LastTransactionOne /> */}
    </section>

  )
}

export default DashBoardLayerTwo