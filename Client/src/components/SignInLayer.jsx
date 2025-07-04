import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const SignInLayer = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [feedback, setFeedback] = useState({ error: null, success: null });

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ error: null, success: null });

    try {
      const { data, status } = await axios.post(
        "https://backend.ajproductiondxb.com/api/auth/login",
        {
          ...form,
          rememberMe,
        }
      );

      if (status === 200 && data.success) {
        setFeedback({ success: data.message, error: null });
        login(data.user);
        localStorage.setItem("token", data.token);
        navigate(data.user.role === "admin" ? "/admin-dashboard" : "/employee-dashboard");
        window.location.reload();
      } else {
        setFeedback({ error: data.message || "Login failed", success: null });
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || "An error occurred. Please try again later.";
      setFeedback({ error: message, success: null });
    }
  };

  return (
    <section className='auth bg-base d-flex flex-wrap'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='assets/images/auth/auth-img.jpg' alt='Authentication' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <Link to='/' className='mb-40 max-w-290-px d-block'>
            <img src='assets/images/logo_black.png' alt='Logo' />
          </Link>
          <h4 className='mb-12'>Sign In to your Account</h4>
          <p className='mb-32 text-secondary-light text-lg'>
            Welcome back! Please enter your details.
          </p>
          {feedback.error && <p className='mb-32 text-danger text-lg'>{feedback.error}</p>}
          {feedback.success && <p className='mb-32 text-success text-lg'>{feedback.success}</p>}

          <form onSubmit={handleSubmit}>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                name='email'
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Email'
                value={form.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='position-relative mb-20'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name='password'
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  id='your-password'
                  placeholder='Password'
                  value={form.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <span
                className={`toggle-password ${passwordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                onClick={togglePasswordVisibility}
              />
            </div>

            <div className='d-flex justify-content-between gap-2'>
              <div className='form-check style-check d-flex align-items-center'>
                <input
                  className='form-check-input border border-neutral-300'
                  type='checkbox'
                  id='remember'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className='form-check-label' htmlFor='remember'>
                  Remember me
                </label>
              </div>
              <Link to='#' className='text-primary-600 fw-medium'>
                Forgot Password?
              </Link>
            </div>

            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
            >
              Sign In
            </button>

            <div className='mt-32 center-border-horizontal text-center'>
              <span className='bg-base z-1 px-4'>Or sign in with</span>
            </div>

            <div className='mt-32 d-flex align-items-center gap-3'>
              <button
                type='button'
                className='fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 bg-hover-primary-50'
              >
                <Icon icon='ic:baseline-facebook' className='text-primary-600 text-xl' />
                Facebook
              </button>
              <button
                type='button'
                className='fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 bg-hover-primary-50'
              >
                <Icon icon='logos:google-icon' className='text-primary-600 text-xl' />
                Google
              </button>
            </div>

            <div className='mt-32 text-center text-sm'>
              <p className='mb-0'>
                Don’t have an account?{" "}
                <Link to='/sign-up' className='text-primary-600 fw-semibold'>
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
