import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  useGetNotificationsQuery,
  useMarkNotiAsReadMutation,
} from "../redux/slices/api/userApiSlice";
import ViewNotification from "./ViewNotification";

const ICONS = {
  alert: <HiBellAlert className="text-secondary" style={{ width: 20, height: 20 }} />,
  message: <BiSolidMessageRounded className="text-secondary" style={{ width: 20, height: 20 }} />,
};

export default function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, refetch } = useGetNotificationsQuery();
  console.log(data);
  

  const notifications = Array.isArray(data) ? data : [];

  const [markAsRead] = useMarkNotiAsReadMutation();

  const viewHandler = (el) => {
    setSelected(el);
    readHandler("one", el._id);
    setOpen(true);
  };

  const readHandler = async (type, id) => {
    await markAsRead({ type, id }).unwrap();
    refetch();
  };

  const callsToAction = [
    { name: "Cancel", href: "#", icon: "" },
    {
      name: "Mark All Read",
      href: "#",
      icon: "",
      onClick: () => readHandler("all", ""),
    },
  ];

  return (
    <>
      <Popover className="position-relative">
        <Popover.Button className="btn btn-link p-0 d-inline-flex align-items-center border-0 shadow-none">
          <div className="position-relative d-flex align-items-center justify-content-center text-dark  w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center" style={{ width: 32, height: 32 }}>
            <IoIosNotificationsOutline className="fs-4" />
            {data?.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {data?.length}
              </span>
            )}
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            className="position-absolute bg-white border z-3 shadow rounded-4 overflow-hidden"
            style={{
                top: '100%',
                right: 0,
                minWidth: '300px',
                maxWidth: '100%',
                padding: '1rem',
            }}
            >
                {({ close }) => (
                    <div>
                    <div className="p-2">
                        {notifications.length > 0 ? (
                        notifications.slice(0, 5).map((item, index) => (
                            <div
                            key={item._id + index}
                            className="d-flex gap-3 align-items-start p-2 rounded mb-2 hover-bg-light"
                            style={{ cursor: "pointer" }}
                            onClick={() => viewHandler(item)}
                            >
                            <div className="d-flex align-items-center justify-content-center rounded bg-light" style={{ width: 32, height: 32 }}>
                                {ICONS[item.notiType]}
                            </div>
                            <div>
                                <div className="d-flex align-items-center gap-2 fw-semibold text-capitalize text-dark">
                                <p className="mb-0">{item.notiType}</p>
                                <span className="text-muted small">{moment(item.createdAt).fromNow()}</span>
                                </div>
                                <p className="text-muted small mt-1 text-truncate" style={{ maxWidth: '200px' }}>
                                {item.text}
                                </p>
                            </div>
                            </div>
                        ))
                        ) : (
                        <div className="text-center text-muted small py-3">
                            No notifications found.
                        </div>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="d-flex border-top pt-2 mt-2">
                        {callsToAction.map((item) => (
                            <Link
                            key={item.name}
                            onClick={
                                item?.onClick ? () => item.onClick() : () => close()
                            }
                            className="flex-fill text-center py-2 fw-semibold text-primary text-decoration-none hover-bg-light"
                            >
                            {item.name}
                            </Link>
                        ))}
                        </div>
                    )}
                    </div>
                )}
        </Popover.Panel>


        



        </Transition>
      </Popover>
      <ViewNotification open={open} setOpen={setOpen} el={selected} />
    </>
  );
}
