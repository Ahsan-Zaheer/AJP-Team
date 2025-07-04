
import React from 'react'

const TopPerformanceOne = () => {
    return (
        <div className="col-xxl-4">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                        <h6 className="mb-2 fw-bold text-lg mb-0">Top Performer</h6>
                    </div>
                    <div className="mt-32">
                        <div className="d-flex align-items-center justify-content-between gap-3 mb-32">
                            <div className="d-flex align-items-center">
                                <img
                                    src="/assets/images/maaz.jpg"
                                    alt=""
                                    className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                />
                                <div className="flex-grow-1">
                                    <h6 className="text-md mb-0">Maaz</h6>
                                    <span className="text-sm text-secondary-light fw-medium">
                                      Real Estate Photo Editor
                                    </span>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopPerformanceOne