import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { getInitials } from "../utils/helper";


export const UserInfo = ({user}) => {
  return (
    <div className="px-4">
        <Popover className="position-relative">
  {({ open }) => (
    <>
      <Popover.Button className="d-flex align-items-center gap-2 border-0 bg-transparent">
        <span>{getInitials(user?.name)}</span>
        </Popover.Button>

        
                <Transition
                    as={Fragment}
                    enter="fade"
                    enterFrom=""
                    enterTo="show"
                    leave="fade"
                    leaveFrom="show"
                    leaveTo=""
                >
                    <Popover.Panel className="position-absolute start-50 translate-middle-x z-3 mt-3 px-4" style={{ maxWidth: '24rem', padding: '0 1rem' }}>
                    <div className="d-flex align-items-center gap-3 rounded shadow bg-white p-3">
                        <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white" style={{ width: '60px', height: '45px', fontSize: '14px' }}>
                        <span className="fw-bold text-center">
                            {getInitials(user?.name)}
                        </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                        <p className="text-dark h6 fw-bold mb-1">{user?.name}</p>
                        <span className="text-muted">{user?.designation}</span>
                        <span className="text-primary">
                            {user?.email ?? "email@example.com"}
                        </span>
                        </div>
                    </div>
                    </Popover.Panel>
            </Transition>
                </>
            )}
        </Popover>
    </div>
  )
}
