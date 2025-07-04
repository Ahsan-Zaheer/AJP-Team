import axios from 'axios';
import { create } from 'zustand';

export const useLeaveStore = create((set) => ({
    leaves: [],
    leave: [],
    
    setLeaves: (leaves) => set({ leaves }),
    setLeave: (leave) => set({ leave }),

    getLeaves: async () => {
        const response = await axios.get('https://backend.ajproductiondxb.com/api/leave/getAll', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.data.success) {
        set({ leaves: response.data.leaves });
        } else {
            console.error("Error fetching leaves:", response.data.message);
        }
    },

    getLeave: async (id) => {
        const response = await axios.get(`https://backend.ajproductiondxb.com/api/leave/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.data.success) {
            
            set({ leave: response.data.leaves });
        } else {
            console.error("Error geting single leave", response.data.message);
        }
    },
    createLeave: async (data) => {
        const response = await axios.post('https://backend.ajproductiondxb.com/api/leave/add', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.data.success) {
            console.log("Leave created successfully:", response.data);
            return true;
        } else {
            console.error("Error creating leave:", response.data.message);
        }
    },
    updateLeave: async (id, status) => {
        const response = await axios.put(`https://backend.ajproductiondxb.com/api/leave/${id}`, {status} , {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });

        if(response.data.success) {
            set((state) => ({
                leave: state.leave.map((userleave) =>
                    userleave._id === id ? { ...userleave, status } : userleave
                ),
            }));
            console.log("Leave updated successfully");
            return true;

        } else {
            console.error("Error updating leave:", response.data.message);
        }
    },
    deleteLeave: async (id) => {
        const response = await axios.put(`https://backend.ajproductiondxb.com/api/leave/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.data.success) {
            set((state) => ({
                leaves: state.leaves.filter((leave) => leave._id !== id),
                leave: state.leave.filter((userleave) => userleave._id !== id),
            }));
            console.log("Leave deleted successfully");
            return true;
        } else {
            console.error("Error deleting leave:", response.data.message);
        }
    },
    deletePermanentLeave: async (id) => {
        const response = await axios.delete(`https://backend.ajproductiondxb.com/api/leave/permanent-delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (response.data.success) {
            console.log("Leave permanently deleted");
            set((state) => ({
                leaves: state.leaves.filter((leave) => leave._id !== id),
            }));
            return true;
        } else {
            console.error("Error permanently deleting leave:", response.data.message);
        }
    },

    restoreLeave: async (id) => {
        const response = await axios.put(`https://backend.ajproductiondxb.com/api/leave/restore/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (response.data.success) {
            console.log("Leave restored successfully");
            await useLeaveStore.getState().getLeaves(); // refresh list
            return true;
        } else {
            console.error("Error restoring leave:", response.data.message);
        }
    },

   
}))