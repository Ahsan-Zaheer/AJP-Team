import { Icon } from '@iconify/react/dist/iconify.js';
import React, {useMemo} from 'react';
import ReactApexChart from 'react-apexcharts';
import useReactApexChart from '../../hook/useReactApexChart';
import { useGetAllTaskQuery } from '../../redux/slices/api/taskApiSlice';
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const SalesStatisticOne = () => {
    let { chartOptions } = useReactApexChart();

    const {user } = useAuthStore();

    const [searchParams] = useSearchParams(); 
    const params = useParams(); 
    const status = params?.status || "";
    const [searchTerm] = useState(searchParams.get("search") || "");
    const { data, isLoading, refetch } = useGetAllTaskQuery({
      
      strQuery: status,
      isTrashed: "",
      search: searchTerm,
    });



    const userTasks = useMemo(() => {
        return data?.tasks?.filter(task =>
            task.team.some(member => member._id === user?.id)
        ) || [];
    }, [data, user]);


    console.log("userTasks", userTasks);
    


    const getMonthlyTaskCounts = () => {
        const taskCounts = Array(12).fill(0); // Default all months to 0

        userTasks?.forEach((task) => {
            if (!task.isTrashed) {
            const taskDate = new Date(task.date);
            const year = taskDate.getFullYear();
            const currentYear = new Date().getFullYear();

            if (year === currentYear) {
                const monthIndex = taskDate.getMonth(); // 0 for Jan, 11 for Dec
                taskCounts[monthIndex]++;
            }
            }
        });

        return taskCounts;
        };

        const chartSeries = [
        {
            name: "Tasks",
            data: getMonthlyTaskCounts(),
        },
    ];

    const monthlyCounts = getMonthlyTaskCounts();

    const currentMonthIndex = new Date().getMonth();
    const currentMonthTasks = monthlyCounts[currentMonthIndex] || 0;
    const prevMonthTasks = monthlyCounts[currentMonthIndex - 1] || 0;

    const percentageChange =
    prevMonthTasks === 0
        ? currentMonthTasks > 0
        ? 100
        : 0
        : Math.round(((currentMonthTasks - prevMonthTasks) / prevMonthTasks) * 100);

    const daysInCurrentMonth = new Date(
    new Date().getFullYear(),
    currentMonthIndex + 1,
    0
    ).getDate();

    const perDayAvg = Math.round(currentMonthTasks / daysInCurrentMonth);





    return (
        <div className="col-xxl-9 col-xl-12">
            <div className="card h-100">
                <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <h5 className="text-lg mb-2 mt-3">Monthly Tasks Statistic</h5>
                       
                    </div>
                    <div className="d-flex flex-wrap align-items-center gap-2 mt-8">
                        <h6 className="mb-0">{userTasks?.length}</h6>
                        <span
                        className={`text-sm fw-semibold rounded-pill ${
                            percentageChange >= 0
                            ? 'bg-success-focus text-success-main br-success'
                            : 'bg-danger-focus text-danger-main br-danger'
                        } border px-8 py-4 line-height-1 d-flex align-items-center gap-1`}
                        >
                        {percentageChange}%
                        <Icon
                            icon={
                            percentageChange >= 0
                                ? 'bxs:up-arrow'
                                : 'bxs:down-arrow'
                            }
                            className="text-xs"
                        />
                        </span>
                        <span className="text-xs fw-medium">+ {perDayAvg} Per Day</span>

                    </div>
                    <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={264} />
                </div>
            </div>
        </div>
    );
};

export default SalesStatisticOne;