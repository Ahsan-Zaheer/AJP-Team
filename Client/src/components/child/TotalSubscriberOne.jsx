import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import ReactApexChart from 'react-apexcharts'
import useReactApexChart from '../../hook/useReactApexChart'
import { useGetAllTaskQuery } from '../../redux/slices/api/taskApiSlice';
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useMemo } from "react";


const TotalSubscriberOne = () => {
    let {  barChartOptions } = useReactApexChart()


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

      const getTasksForWeek = (tasks, date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6); // Saturday

        const days = Array(7).fill(0); // Sun to Sat

        tasks.forEach(task => {
            const taskDate = new Date(task.date);
            if (taskDate >= startOfWeek && taskDate <= endOfWeek && !task.isTrashed) {
            const dayIndex = taskDate.getDay(); // 0 (Sun) - 6 (Sat)
            days[dayIndex]++;
            }
        });

        return days;
        };

        const currentWeek = useMemo(() => getTasksForWeek(userTasks, new Date()), [userTasks]);
        const prevWeek = useMemo(() => {
        const lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);
        return getTasksForWeek(userTasks, lastWeekDate);
        }, [userTasks]);

        const weeklyChartSeries = [
        {
            name: "Tasks",
            data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => ({
            x: day,
            y: currentWeek[idx],
            })),
        },
        ];

        const totalCurrentWeek = currentWeek.reduce((a, b) => a + b, 0);
        const totalPrevWeek = prevWeek.reduce((a, b) => a + b, 0);

        const weeklyPercentageChange =
        totalPrevWeek === 0
            ? totalCurrentWeek > 0
            ? 100
            : 0
            : Math.round(((totalCurrentWeek - totalPrevWeek) / totalPrevWeek) * 100);

        const avgPerDayWeek = Math.round(totalCurrentWeek / 7);

      
  
    return (
        <div className="col-xxl-3 col-xl-6">
            <div className="card h-100 radius-8 border">
                <div className="card-body p-24">
                    <h6 className="mb-12 fw-semibold text-lg mb-16">Weekly Tasks</h6>
                    <div className="d-flex align-items-center gap-2 mb-20">
                        <h6 className="fw-semibold mb-0">{totalCurrentWeek}</h6>
                        <p className="text-sm mb-0">
                            <span
                                className={`${
                                weeklyPercentageChange >= 0
                                    ? 'bg-success-focus text-success-main br-success'
                                    : 'bg-danger-focus text-danger-main br-danger'
                                } px-8 py-2 rounded-pill fw-semibold text-sm d-inline-flex align-items-center gap-1`}
                            >
                                {Math.abs(weeklyPercentageChange)}%
                                <Icon
                                icon={
                                    weeklyPercentageChange >= 0
                                    ? "bxs:up-arrow"
                                    : "iconamoon:arrow-down-2-fill"
                                }
                                className="icon"
                                />
                            </span>
                            &nbsp;{weeklyPercentageChange >= 0 ? '+' : '-'} {avgPerDayWeek} Per Day
                        </p>
                    </div>
                    <ReactApexChart
                    options={barChartOptions}
                    series={weeklyChartSeries}
                    type="bar"
                    height={264}
                    />
                </div>
            </div>
        </div>
    )
}

export default TotalSubscriberOne