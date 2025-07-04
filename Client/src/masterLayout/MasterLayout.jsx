import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import { useAuthStore } from "../store/authStore";
import NotificationPanel from "../component/NotificationPanel";


const MasterLayout = ({ children }) => {
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation(); 

  const {user, logout, profileImage} = useAuthStore();
  
  const navigate = useNavigate();
  
 const handleLogout = async () => {
  await new Promise((resolve) => {
    logout();
    setTimeout(resolve, 10); // small delay to allow state update
  });
  navigate('/sign-in', { replace: true });
  window.location.reload(); // reload the page to reset state
};




  
  
  
  
  

  useEffect(() => {
    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location.pathname ||
            link.getAttribute("to") === location.pathname
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type='button'
          className='sidebar-close-btn'
        >
          <Icon icon='radix-icons:cross-2' />
        </button>
        <div>
          <Link to='/' className='sidebar-logo'>
            <img
              src='/assets/images/logo_black.png'
              alt='site logo'
              className='light-logo'
            />
            <img
              src='/assets/images/logo_white.png'
              alt='site logo'
              className='dark-logo'
            />
            <img
              src='/assets/images/logo_black.png'
              alt='site logo'
              className='logo-icon'
            />
          </Link>
        </div>
        <div className='sidebar-menu-area'>
          <ul className='sidebar-menu' id='sidebar-menu'>
            <li>
              <NavLink to={user?.role === "admin" ? "/admin-dashboard" : "/employee-dashboard"}>
                <Icon
                  icon='solar:home-smile-angle-outline'
                  className='menu-icon'
                />
                <span>Dashboard</span>
              </NavLink>
              
            </li>

            <li className='sidebar-menu-group-title'>Application</li>


            <li>
              <NavLink
                to={`/view-profile/${user?._id}`}
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon='flowbite:users-group-outline' className='menu-icon' />
                <span>My Profile</span>
              </NavLink>
            </li>


            <li>
              <NavLink
                to='/leaves'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon='lets-icons:paper-fill' className='menu-icon' />
                <span>Leaves</span>
              </NavLink>
            </li>


            {user?.role === "admin" && (
            <li>
              <NavLink
                to='/email'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon='mage:email' className='menu-icon' />
                <span>Email</span>
              </NavLink>
            </li>)}

            {user?.role === "admin" && (
            <li>
              <NavLink
                to='/chat-message'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon='bi:chat-dots' className='menu-icon' />
                <span>Chat</span>
              </NavLink>
            </li>)}
            <li>
              <NavLink
                to='/calendar-main'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon='solar:calendar-outline' className='menu-icon' />
                <span>Calendar</span>
              </NavLink>
            </li>
            {user?.email === "dev.ahsan18@gmail.com" && (
            <li>
              <NavLink
                to='/kanban'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon='material-symbols:map-outline'
                  className='menu-icon'
                />
                <span>Kanban</span>
              </NavLink>
            </li>
            )}
            <li >
              <NavLink
                to='/tasks'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon='mingcute:task-2-line'
                  className='menu-icon'
                />
                <span>Tasks</span>
              </NavLink>
              
            </li>

            

            {/* Department Dropdown */}
            <li >
              <NavLink to='/department-list' className={(navData) => (navData.isActive ? "active-page" : "")}>
                <Icon icon='mingcute:building-5-line' className='menu-icon' />
                <span>Departments</span>
              </NavLink>
             
            </li>


             <li >
              <NavLink
                to='/users-grid'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon='flowbite:users-group-outline'
                  className='menu-icon'
                />
                <span>Employees</span>
              </NavLink>
              
            </li> 



            {/* Invoice Dropdown */}

            {user?.role === "admin" && (
            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='hugeicons:invoice-03' className='menu-icon' />
                <span>Invoice</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink
                    to='/invoice-list'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />{" "}
                    List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/invoice-preview'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' />
                    Preview
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/invoice-add'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Add new
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/invoice-edit'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Edit
                  </NavLink>
                </li>
              </ul>
            </li>)}

            {/* Ai Application Dropdown */}
            {user?.role === "admin" && (
            <li className='dropdown'>
              <Link to='#'>
                <i className='ri-robot-2-line mr-10' />

                <span>Ai Application</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink
                    to='/text-generator'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />{" "}
                    Text Generator
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/code-generator'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' />{" "}
                    Code Generator
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/image-generator'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Image Generator
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/voice-generator'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Voice Generator
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/video-generator'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-success-main w-auto' />{" "}
                    Video Generator
                  </NavLink>
                </li>
              </ul>
            </li>)}



            {user?.email === "dev.ahsan18@gmail.com" && (
              <>
                <li className='sidebar-menu-group-title'>UI Elements</li>

                {/* Components Dropdown */}
                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='solar:document-text-outline' className='menu-icon' />
                    <span>Components</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink to='/typography' className={({ isActive }) => isActive ? "active-page" : ""}>
                        <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                        Typography
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to='/colors' className={({ isActive }) => isActive ? "active-page" : ""}>
                        <i className='ri-circle-fill circle-icon text-warning-main w-auto' />
                        Colors
                      </NavLink>
                    </li>
                    {/* Repeat the same structure for all other items... */}
                  </ul>
                </li>

                {/* Forms Dropdown */}
                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='heroicons:document' className='menu-icon' />
                    <span>Forms</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink to='/form' className={({ isActive }) => isActive ? "active-page" : ""}>
                        <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                        Input Forms
                      </NavLink>
                    </li>
                    {/* Add remaining form menu items here */}
                  </ul>
                </li>

                {/* Tables Dropdown */}
                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mingcute:storage-line' className='menu-icon' />
                    <span>Table</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink to='/table-basic' className={({ isActive }) => isActive ? "active-page" : ""}>
                        <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                        Basic Table
                      </NavLink>
                    </li>
                    {/* Add remaining table menu items here */}
                  </ul>
                </li>

                {/* Charts Dropdown */}
                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='solar:pie-chart-outline' className='menu-icon' />
                    <span>Chart</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink to='/line-chart' className={({ isActive }) => isActive ? "active-page" : ""}>
                        <i className='ri-circle-fill circle-icon text-danger-main w-auto' />
                        Line Chart
                      </NavLink>
                    </li>
                    {/* Add remaining chart menu items here */}
                  </ul>
                </li>
              </>
            )}



            {/* Authentication Dropdown */}

            {user?.email === "dev.ahsan18@gmail.com" && (
            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='simple-line-icons:vector' className='menu-icon' />
                <span>Authentication</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink
                    to='/sign-in'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />{" "}
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/sign-up'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' />{" "}
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/forgot-password'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Forgot Password
                  </NavLink>
                </li>
              </ul>
            </li>)}

            {/* gallery */}


            {user?.email === "dev.ahsan18@gmail.com" && (

            <li className='dropdown'>
              <Link to='#'>
                <Icon
                  icon='flowbite:users-group-outline'
                  className='menu-icon'
                />
                <span>Gallery</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink
                    to='/gallery-grid'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />{" "}
                    Gallery Grid
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/gallery'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' />{" "}
                    Gallery Grid Desc
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/gallery-masonry'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Gallery Grid
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/gallery-hover'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Gallery Hover Effect
                  </NavLink>
                </li>
              </ul>
            </li>)}


            {user?.email === "dev.ahsan18@gmail.com" && (

            <li>
              <NavLink
                to='/pricing'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon='hugeicons:money-send-square'
                  className='menu-icon'
                />
                <span>Pricing</span>
              </NavLink>
            </li>
            )}


            <li>
              <NavLink
                to='/faq'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon='mage:message-question-mark-round'
                  className='menu-icon'
                />
                <span>FAQs.</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/trash'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon='lets-icons:trash'
                  className='menu-icon'
                />
                <span>Trash</span>
              </NavLink>
            </li>
           

            <li>
              <NavLink
                to='/terms-condition'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon='octicon:info-24' className='menu-icon' />
                <span>Terms &amp; Conditions</span>
              </NavLink>
            </li>


            {user?.email === "dev.ahsan18@gmail.com" && (
            <li>
              <NavLink
                to='/coming-soon'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className='ri-rocket-line menu-icon'></i>
                <span>Coming Soon</span>
              </NavLink>
            </li>

            )}


            {user?.email === "dev.ahsan18@gmail.com" && (
              <>
            <li>
              <NavLink
                to='/access-denied'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className='ri-folder-lock-line menu-icon'></i>
                <span>Access Denied</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/maintenance'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className='ri-hammer-line menu-icon'></i>
                <span>Maintenance</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/blank-page'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className='ri-checkbox-multiple-blank-line menu-icon'></i>
                <span>Blank Page</span>
              </NavLink>
            </li>
            </>)}

            {/* Settings Dropdown */}

            {user?.email === "dev.ahsan18@gmail.com" && (
            <li className='dropdown'>
              <Link to='#'>
                <Icon
                  icon='icon-park-outline:setting-two'
                  className='menu-icon'
                />
                <span>Settings</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink
                    to='/company'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />{" "}
                    Company
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/notification'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' />{" "}
                    Notification
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/notification-alert'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Notification Alert
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/theme'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Theme
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/currencies'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Currencies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/language'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Languages
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/payment-gateway'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Payment Gateway
                  </NavLink>
                </li>
              </ul>
            </li>)}
          </ul>
        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className='navbar-header'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-4'>
                <button
                  type='button'
                  className='sidebar-toggle'
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon='iconoir:arrow-right'
                      className='icon text-2xl non-active'
                    />
                  ) : (
                    <Icon
                      icon='heroicons:bars-3-solid'
                      className='icon text-2xl non-active '
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type='button'
                  className='sidebar-mobile-toggle'
                >
                  <Icon icon='heroicons:bars-3-solid' className='icon' />
                </button>
                <form className='navbar-search'>
                  <input type='text' name='search' placeholder='Search' />
                  <Icon icon='ion:search-outline' className='icon' />
                </form>
              </div>
            </div>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-3'>


                {/* ThemeToggleButton */}
                <ThemeToggleButton />
               
               
                <div className='dropdown'>
                  <button
                    className='has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center'
                    type='button'
                    data-bs-toggle='dropdown'
                  >
                    <Icon
                      icon='mage:email'
                      className='text-primary-light text-xl'
                    />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-lg p-0'>
                    <div className='m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-0'>
                          Message
                        </h6>
                      </div>
                      <span className='text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center'>
                        05
                      </span>
                    </div>
                    <div className='max-h-400-px overflow-y-auto scroll-sm pe-4'>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-40-px h-40-px rounded-circle flex-shrink-0 position-relative'>
                            <img
                              src='assets/images/notification/profile-3.png'
                              alt=''
                            />
                            <span className='w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0' />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Kathryn Murphy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-100-px'>
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                          <span className='text-sm text-secondary-light flex-shrink-0'>
                            12:30 PM
                          </span>
                          <span className='mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle'>
                            8
                          </span>
                        </div>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-40-px h-40-px rounded-circle flex-shrink-0 position-relative'>
                            <img
                              src='assets/images/notification/profile-4.png'
                              alt=''
                            />
                            <span className='w-8-px h-8-px  bg-neutral-300 rounded-circle position-absolute end-0 bottom-0' />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Kathryn Murphy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-100-px'>
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                          <span className='text-sm text-secondary-light flex-shrink-0'>
                            12:30 PM
                          </span>
                          <span className='mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle'>
                            2
                          </span>
                        </div>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-40-px h-40-px rounded-circle flex-shrink-0 position-relative'>
                            <img
                              src='assets/images/notification/profile-5.png'
                              alt=''
                            />
                            <span className='w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0' />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Kathryn Murphy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-100-px'>
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                          <span className='text-sm text-secondary-light flex-shrink-0'>
                            12:30 PM
                          </span>
                          <span className='mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-neutral-400 rounded-circle'>
                            0
                          </span>
                        </div>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-40-px h-40-px rounded-circle flex-shrink-0 position-relative'>
                            <img
                              src='assets/images/notification/profile-6.png'
                              alt=''
                            />
                            <span className='w-8-px h-8-px bg-neutral-300 rounded-circle position-absolute end-0 bottom-0' />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Kathryn Murphy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-100-px'>
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                          <span className='text-sm text-secondary-light flex-shrink-0'>
                            12:30 PM
                          </span>
                          <span className='mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-neutral-400 rounded-circle'>
                            0
                          </span>
                        </div>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-40-px h-40-px rounded-circle flex-shrink-0 position-relative'>
                            <img
                              src='assets/images/notification/profile-7.png'
                              alt=''
                            />
                            <span className='w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0' />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Kathryn Murphy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-100-px'>
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                          <span className='text-sm text-secondary-light flex-shrink-0'>
                            12:30 PM
                          </span>
                          <span className='mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle'>
                            8
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className='text-center py-12 px-16'>
                      <Link
                        to='#'
                        className='text-primary-600 fw-semibold text-md'
                      >
                        See All Message
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Message dropdown end */}


                <NotificationPanel/>





               
                {/* Notification dropdown end */}
                <div className='dropdown'>
                  <button
                    className='d-flex justify-content-center align-items-center rounded-circle'
                    type='button'
                    data-bs-toggle='dropdown'
                  >
                    <img
                      src={`${profileImage === null  ? "assets/images/avatar/avatar-group1.png" : profileImage}`}
                      alt='image_user'
                      className='w-40-px h-40-px object-fit-cover rounded-circle'
                    />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-sm'>
                    <div className='py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-2'>
                          {user == null ? "" : user.name}
                        </h6>
                        <span className='text-secondary-light fw-medium text-sm'>
                        {user == null ? "" : user.role}
                        </span>
                      </div>
                      <button type='button' className='hover-text-danger'>
                        <Icon
                          icon='radix-icons:cross-1'
                          className='icon text-xl'
                        />
                      </button>
                    </div>
                    <ul className='to-top-list'>
                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                          to={`/view-profile/${user == null ? "" : user?._id}`}
                        >
                          <Icon
                            icon='solar:user-linear'
                            className='icon text-xl'
                          />{" "}
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                          to='/email'
                        >
                          <Icon
                            icon='tabler:message-check'
                            className='icon text-xl'
                          />{" "}
                          Inbox
                        </Link>
                      </li>
                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                          to='/company'
                        >
                          <Icon
                            icon='icon-park-outline:setting-two'
                            className='icon text-xl'
                          />
                          Setting
                        </Link>
                      </li>
                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3'
                          onClick={()=> handleLogout()}
                        >
                          <Icon icon='lucide:power' className='icon text-xl' />{" "}
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Profile dropdown end */}
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div className='dashboard-main-body'>{children}</div>

        {/* Footer section */}
        <footer className='d-footer'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <p className='mb-0'>© 2025 Aj Production Team. All Rights Reserved.</p>
            </div>
            
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
