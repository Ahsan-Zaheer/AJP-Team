import  {useEffect, useMemo} from 'react'
import { Icon } from '@iconify/react';
import { useGetDasboardStatsQuery } from '../../redux/slices/api/taskApiSlice';
import Loading from '../../component/Loader';
import { useLeaveStore } from '../../store/leaveStore';
import { useAuthStore } from '../../store/authStore';





const UnitCountOne = () => {


    const { data, isLoading } = useGetDasboardStatsQuery();
    const { leave, getLeave } = useLeaveStore();
    const { user } = useAuthStore();

    useEffect(() => {
        getLeave(user?.id);
    }, []);
    const totalLeaveDaysThisMonth = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return leave?.reduce((total, item) => {
            const from = new Date(item.fromDate);
            const to = new Date(item.toDate);

            // Only count leaves that intersect with the current month
            if (
            (from.getMonth() === currentMonth && from.getFullYear() === currentYear) ||
            (to.getMonth() === currentMonth && to.getFullYear() === currentYear)
            ) {
            // Get the later of fromDate or the first day of this month
            const start = from < new Date(currentYear, currentMonth, 1)
                ? new Date(currentYear, currentMonth, 1)
                : from;

            // Get the earlier of toDate or the last day of this month
            const end = to > new Date(currentYear, currentMonth + 1, 0)
                ? new Date(currentYear, currentMonth + 1, 0)
                : to;

            const dayDiff = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1; // +1 to count inclusive

            return total + (dayDiff > 0 ? dayDiff : 0);
            }

            return total;
        }, 0);
        }, [leave]);



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
      total: totals["todo"] || 0,
      bg: "bg-[#be185d]" || 0,
    },
  ];


    return (
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-1 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Total Tasks </p>
                                <h6 className="mb-0">{stats[0].total}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="tdesign:task-filled"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-2 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Completed Tasks
                                </p>
                                <h6 className="mb-0">{stats[1].total}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fa-solid:award"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                       
                    </div>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-3 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Task In Progress
                                </p>
                                <h6 className="mb-0">{stats[2].total}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="tdesign:task-time-filled"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-4 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Todos</p>
                                <h6 className="mb-0">{stats[3].total}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fluent-mdl2:task-list"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-5 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Total Leaves</p>
                                <h6 className="mb-0">{totalLeaveDaysThisMonth}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="lets-icons:paper-fill"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* card end */}
            </div>
        </div>

    )
}

export default UnitCountOne