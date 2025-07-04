import React from 'react'

const FaqLayer = () => {
    return (
        <div className="card basic-data-table">
            <div className="card-header p-0 border-0">
                <div className="responsive-padding-40-150 bg-light-pink">
                    <div className="row gy-4 align-items-center">
                        <div className="col-xl-7">
                            <h4 className="mb-20">Frequently asked questions.</h4>
                            <p className="mb-0 text-secondary-light max-w-634-px text-xl">
                                 The AJ Production Portal is an internal tool developed for our team to streamline task assignments, monitor progress, and manage leave requests efficiently.
                            </p>
                        </div>
                        <div className="col-xl-5 d-xl-block d-none">
                            <img src="assets/images/10837982_19333429.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body bg-base responsive-padding-40-150">
                <div className="row gy-4">
                    <div className="col-lg-4">
                        <div
                            className="active-text-tab nav flex-column nav-pills bg-base shadow py-0 px-24 radius-12 border"
                            id="v-pills-tab"
                            role="tablist"
                            aria-orientation="vertical"
                        >
                            <button
                                className="nav-link text-secondary-light fw-semibold text-xl px-0 py-16 border-bottom active"
                                id="v-pills-about-us-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-about-us"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-about-us"
                                aria-selected="true"
                            >
                                General
                            </button>
                            <button
                                className="nav-link text-secondary-light fw-semibold text-xl px-0 py-16 border-bottom"
                                id="v-pills-ux-ui-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-ux-ui"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-ux-ui"
                                aria-selected="false"
                            >
                                Task Management
                            </button>
                            <button
                                className="nav-link text-secondary-light fw-semibold text-xl px-0 py-16 border-bottom"
                                id="v-pills-development-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-development"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-development"
                                aria-selected="false"
                            >
                                Leave Management
                            </button>
                            <button
                                className="nav-link text-secondary-light fw-semibold text-xl px-0 py-16 border-bottom"
                                id="v-pills-use-case-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-use-case"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-use-case"
                                aria-selected="false"
                            >
                                Account & Support
                            </button>
                           
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="v-pills-about-us"
                                role="tabpanel"
                                aria-labelledby="v-pills-about-us-tab"
                                tabIndex={0}
                            >
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                What is the AJ Production Portal?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse show"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                The AJ Production Portal is an internal tool developed for our team to streamline task assignments, monitor progress, and manage leave requests efficiently.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >
                                               Who can access the portal?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseTwo"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                Only registered team members of AJ Production can access the portal using their official credentials.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="false"
                                                aria-controls="collapseThree"
                                            >
                                                What features are available in the portal?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseThree"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                The portal includes: 
                                                <li>
                                                Task Management System 
                                                </li>

                                                <li>
                                                    Leave Management System
                                                </li>
                                                <li>
                                                    Team Notifications
                                                </li>
                                                <li>
                                                    Performance Insights
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="v-pills-ux-ui"
                                role="tabpanel"
                                aria-labelledby="v-pills-ux-ui-tab"
                                tabIndex={0}
                            >
                                <div className="accordion" id="accordionExampleTwo">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#c-1"
                                                aria-expanded="true"
                                                aria-controls="c-1"
                                            >
                                               How do I view my assigned tasks?
                                            </button>
                                        </h2>
                                        <div
                                            id="c-1"
                                            className="accordion-collapse collapse show"
                                            data-bs-parent="#accordionExampleTwo"
                                        >
                                            <div className="accordion-body">
                                                After logging in, go to the Dashboard or Tasks tab to see all your assigned tasks along with deadlines and status updates.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#c-2"
                                                aria-expanded="false"
                                                aria-controls="c-2"
                                            >
                                                Can I create or assign tasks to others?
                                            </button>
                                        </h2>
                                        <div
                                            id="c-2"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExampleTwo"
                                        >
                                            <div className="accordion-body">
                                                Only managers or team leads can assign tasks to members. If you need to assign a task, please contact your lead.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#c-3"
                                                aria-expanded="false"
                                                aria-controls="c-3"
                                            >
                                                How do I update the status of a task?
                                            </button>
                                        </h2>
                                        <div
                                            id="c-3"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExampleTwo"
                                        >
                                            <div className="accordion-body">
                                                Click on the three dots in the task card, then click on the edit task and use the status dropdown (e.g., To-Do, In Progress, Completed) to update your progress.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#c-4"
                                                aria-expanded="false"
                                                aria-controls="c-4"
                                            >
                                                Can I attach files or add comments to tasks?
                                            </button>
                                        </h2>
                                        <div
                                            id="c-4"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExampleTwo"
                                        >
                                            <div className="accordion-body">
                                                Yes, you can upload relevant files and leave comments for better collaboration under each task.
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="v-pills-development"
                                role="tabpanel"
                                aria-labelledby="v-pills-development-tab"
                                tabIndex={0}
                            >
                                <div className="accordion" id="accordionExampleThree">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#c-7"
                                                aria-expanded="true"
                                                aria-controls="c-7"
                                            >
                                                How do I apply for leave?
                                            </button>
                                        </h2>
                                        <div
                                            id="c-7"
                                            className="accordion-collapse collapse show"
                                            data-bs-parent="#accordionExampleThree"
                                        >
                                            <div className="accordion-body">
                                                Go to the Leaves Tab, select the type of leave, dates, and submit the request. You will receive a confirmation once it’s approved.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#c-8"
                                                aria-expanded="false"
                                                aria-controls="c-8"
                                            >
                                                How can I check the status of my leave request?
                                            </button>
                                        </h2>
                                        <div
                                            id="c-8"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExampleThree"
                                        >
                                            <div className="accordion-body">
                                                 In the Leaves Tab, you can view all past and pending leave requests along with their status (Approved, Pending, or Rejected).
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#c-9"
                                                aria-expanded="false"
                                                aria-controls="c-9"
                                            >
                                                Who approves my leave requests?
                                            </button>
                                        </h2>
                                        <div
                                            id="c-9"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExampleThree"
                                        >
                                            <div className="accordion-body">
                                                Leave requests are reviewed and approved by your immediate supervisor or the HR admin.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#c-10"
                                                aria-expanded="false"
                                                aria-controls="c-10"
                                            >
                                                 Can I cancel or modify a leave request after submission?
                                            </button>
                                        </h2>
                                        <div
                                            id="c-10"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExampleThree"
                                        >
                                            <div className="accordion-body">
                                                Yes, if the leave is still pending approval, you can edit or cancel it. Approved leaves require manager intervention to modify.
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="v-pills-use-case"
                                role="tabpanel"
                                aria-labelledby="v-pills-use-case-tab"
                                tabIndex={0}
                            >
                                <div className="accordion" id="accordionExampleFour">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#c-13"
                                                aria-expanded="true"
                                                aria-controls="c-13"
                                            >
                                                I forgot my password. What should I do?
                                            </button>
                                        </h2>
                                        <div
                                            id="c-13"
                                            className="accordion-collapse collapse show"
                                            data-bs-parent="#accordionExampleFour"
                                        >
                                            <div className="accordion-body">
                                                Click on “Forgot Password” on the login screen and follow the instructions to reset your password. If this is not available yet contact your admin for assistance.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button text-primary-light text-xl collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#c-14"
                                                aria-expanded="false"
                                                aria-controls="c-14"
                                            >
                                                Is my data secure?
                                            </button>
                                        </h2>
                                        <div
                                            id="c-14"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExampleFour"
                                        >
                                            <div className="accordion-body">
                                                Yes, the portal uses secure authentication and encrypted storage to keep your information safe.
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

    )
}

export default FaqLayer