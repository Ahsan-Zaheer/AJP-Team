import axios from 'axios';
import { create } from 'zustand';

export const useDepartmentStore = create((set) => ({
    departments: [],
    department: [],
    
    setDepartments: (departments) => set({ departments }),
    setDepartment: (department) => set({ department }),

    getDepartments: async () => {
        const response = await axios.get('https://backend.ajproductiondxb.com/api/department/getAll', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.data.success) {
        set({ departments: response.data });
        } else {
            console.error("Error fetching departments:", response.data.message);
        }
    },

    getDepartment: async (id) => {
        const response = await axios.get(`https://backend.ajproductiondxb.com/api/department/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.data.success) {
            set({ department: response.data.department });
        } else {
            console.error("Error geting single department:", response.data.message);
        }
    },
    deleteDepartment: async (id) => {
        const response = await axios.delete(`https://backend.ajproductiondxb.com/api/department/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.data.success) {
            set((state) => ({
                departments: Array.isArray(state.departments)
                    ? state.departments.filter((department) => department._id !== id)
                    : [],
            }));

            console.log("Department deleted successfully");
            return response.data.success;
        } else {
            console.error("Error deleting department:", response.data.message);
        }
    }
}))