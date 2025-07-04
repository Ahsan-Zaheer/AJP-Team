import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';




export const useAuthStore = create(
  
  persist(
    (set) => ({
      user: null,
      profileImage: null,
      users: null,
      employee: null,
      profileImages: null,
      isAuthenticated: false,
      hasHydrated: false,

      login: (user) => {
        const normalizedUser = {
          ...user,
          id: user._id || user.id,
        };
        set({ 
           user: normalizedUser,
           isAuthenticated: true,
           profileImage: user.profileImage && user.profileImage !== "" ? `https://backend.ajproductiondxb.com/${user.profileImage}` : null,
           });
           localStorage.setItem('user', JSON.stringify(user));

      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("auth-storage");
        set({
          user: null,
          isAuthenticated: false,
          profileImage: null,
        });
        
      },

      setHasHydrated: () => set({ hasHydrated: true }),
      setLoading: (loading) => set({ isAuthLoading: loading }),


      register: async (employee) => {
        const response = await axios.post('https://backend.ajproductiondxb.com/api/auth/register', employee,{
          headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
          });


          if(response.data.success) {
           console.log("Employee registered successfully:", response.data);
           return true;

          } else {
              console.error("Error fetching departments:", response.data.message);
              return false;
          }
      },
      getAllEmployees: async () => {
        
        const response = await axios.get('https://backend.ajproductiondxb.com/api/auth/getAllEmployees', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.data.success) {
          set({ 
            users: response.data.employees,
            profileImages: response.data.employees.map(emp => emp.profileImage == null ? null : `https://backend.ajproductiondxb.com/${emp.profileImage}`),

           });
        } else {
          console.error("Error fetching employees:", response.data.message);
        }
      },

    
      getEmployee: async (id) => {
        const response = await axios.get(`https://backend.ajproductiondxb.com/api/auth/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.data.success) {
            set({ 
              employee: response.data.employee,
              profileImages: response.data.employee.profileImage && response.data.employee.profileImage !== "" ? `https://backend.ajproductiondxb.com/${response.data.employee.profileImage}` : null,
             });

        } else {
            console.error("Error getting single employee:", response.data.message);
        }
    },
    


    updateEmployee: async (id, updatedData) => {
      try {

        const response = await axios.put(`https://backend.ajproductiondxb.com/api/auth/${id}`, updatedData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (response.data.success && response.data.employee) {
          console.log("Employee updated successfully:", response.data);
          
           set({
              employee: response.data.employee,
              profileImages: response.data?.employee?.profileImage
                ? `http://localhost:5000/${response.data.employee.profileImage}`
                : null,
            });

            return true;

          } else {
            console.error("Error updating employee:", response.data.message || "No employee data returned");
            return false;
          }

      } catch (error) {
        console.error("Server error during employee update:", error);
        return false;
      }
    },
    
    changePassword: async (id, newPassword) => {
        try {

          const response = await axios.put(
            `https://backend.ajproductiondxb.com/api/auth/change-password/${id}`,
            { newPassword },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          if (response.data.success) {
            console.log('Password changed successfully');
            return true;
          } else {
            console.error('Password change failed:', response.data.message);
            return false;
          }
        } catch (error) {
          console.error('Error changing password:', error.response?.data?.message || error.message);
          return false;
        }
      },

    }),

    
     
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
      onRehydrateStorage: () => (state, error) => {
        const user = state?.user;
        if (user) {
          const normalizedUser = {
            ...user,
            id: user._id || user.id,
          };

          state.user = normalizedUser;
          state.isAuthenticated = true;
          state.profileImage =
            normalizedUser.profileImage && normalizedUser.profileImage !== ""
              ? `https://backend.ajproductiondxb.com/${normalizedUser.profileImage}`
              : null;
        } else {
          state.user = null;
          state.isAuthenticated = false;
          state.profileImage = null;
        }


        state.hasHydrated = true;
      },


    }
  )
);
