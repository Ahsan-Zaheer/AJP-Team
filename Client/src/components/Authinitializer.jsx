import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Authinitializer() {
  const { login, logout, setLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("https://backend.ajproductiondxb.com/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            login(response.data.user);
          } else {
            logout();
            navigate("/sign-in");
          }
        } else {
          logout();
          navigate("/sign-in");
        }
      } catch (error) {
        console.error("Error verifying user", error);
        logout();
        navigate("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  return null;
}
