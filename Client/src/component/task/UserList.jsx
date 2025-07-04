import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import clsx from "clsx";
import { getInitials } from "../../utils/helper";
import { MdCheck } from "react-icons/md";
import { useGetTeamListsQuery } from "../../redux/slices/api/userApiSlice";
import { useAuthStore } from "../../store/authStore";

const UserList = ({ setTeam, team }) => {
  const { data = [], isLoading } = useGetTeamListsQuery({ search: "" });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { user } = useAuthStore();

  const isAdmin = user?.role === "admin";

  // Initialize selection based on user role
  useEffect(() => {
    if (!isLoading) {
      if (isAdmin) {
        // Admin: load from team IDs
        if (team?.length > 0) {
          const matched = data.filter((u) => team.includes(u._id));
          setSelectedUsers(matched);
        } else {
          setSelectedUsers([]);
        }
      } else {
        // Employee: set themselves
        setSelectedUsers([user]);
        setTeam([user._id]);
      }
    }
  }, [isLoading, data, team, user, isAdmin, setTeam]);

  const handleChange = (el) => {
    setSelectedUsers(el);
    setTeam(el?.map((u) => u._id));
  };

  const dropdownOptions = isAdmin ? data : [user];

  return (
    <div>
      <p className="text-secondary fw-semibold mb-2">Assign Task To:</p>
      <Listbox
        value={selectedUsers}
        onChange={handleChange}
        multiple
        disabled={!isAdmin} // Make dropdown read-only for employees
      >
        <div className="position-relative mt-2">
          <Listbox.Button className="form-control d-flex align-items-center position-relative bg-white">
            <span className="text-truncate">
              {selectedUsers?.map((user) => user.name).join(", ")}
            </span>
            {isAdmin && (
              <span className="position-absolute top-50 end-0 translate-middle-y pe-2">
                <BsChevronExpand className="text-muted" aria-hidden="true" />
              </span>
            )}
          </Listbox.Button>

          {isAdmin && (
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="listbox-scrollable position-absolute z-3 mt-1 w-100 overflow-auto bg-white border rounded shadow-sm list-unstyled" style={{ maxHeight: "290px", overflowY: "auto" }}>
                {dropdownOptions.map((u, index) => (
                  <Listbox.Option
                    key={u._id || index}
                    className={({ active }) =>
                      `position-relative px-3 py-3 ${
                        active ? "bg-warning text-dark" : "text-dark"
                      }`
                    }
                    value={u}
                  >
                    {({ selected }) => (
                      <>
                        <div
                          className={clsx(
                            "d-flex align-items-center gap-2 text-truncate ms-3",
                            selected ? "fw-semibold" : "fw-normal"
                          )}
                        >
                          <div
                            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                            style={{ width: 30, height: 30 }}
                          >
                            <span className="text-center small">
                              {getInitials(u?.name)}
                            </span>
                          </div>
                          <span>{u.name}</span>
                        </div>
                        {selected && (
                          <span className="position-absolute top-50 start-0 translate-middle-y ps-2 text-success">
                            <MdCheck
                              className="me-2"
                              style={{ height: "50px", fontSize: "25px" }}
                              aria-hidden="true"
                            />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          )}
        </div>
      </Listbox>
    </div>
  );
};

export default UserList;
