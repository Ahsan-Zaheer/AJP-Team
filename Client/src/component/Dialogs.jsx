import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";

export default function ConfirmatioDialog({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type,
  setType,

  }) {


  const closeDialog = () => {
    setMsg(null);
    setType(null); // or leave this line out if you want to preserve the type
    setOpen(false);
  };


  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className="py-4 w-100 d-flex flex-column gap-3 align-items-center justify-content-center">
          <Dialog.Title as="h3">
            <p
              className={clsx(
                "p-3 rounded-circle",
                type === "restore" || type === "restoreAll"
                  ? "text-warning bg-warning bg-opacity-25"
                  : "text-danger bg-danger bg-opacity-25"
              )}
            >
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>

          <p className="text-center text-muted">
            {msg ?? "Are you sure you want to delete the selected record?"}
          </p>

          <div className="bg-light py-3 d-flex flex-row-reverse gap-3 w-100 justify-content-center">
            <Button
              type="button"
              className={clsx(
                "btn btn-sm text-white",
                type === "restore" || type === "restoreAll"
                  ? "btn-warning"
                  : "btn-danger"
              )}
              onClick={onClick}
              label={type === "restore" ? "Restore" : "Delete"}
            />

            <Button
              type="button"
              className="btn btn-outline-secondary px-3 btn-sm"
              onClick={closeDialog}
              label="Cancel"
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className="py-4 w-100 d-flex flex-column gap-3 align-items-center justify-content-center">
          <Dialog.Title as="h3">
            <p className="p-3 rounded-circle text-danger bg-danger bg-opacity-25">
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>

          <p className="text-center text-muted">
            Are you sure you want to activate or deactivate this account?
          </p>

          <div className="bg-light py-3 d-flex flex-row-reverse gap-3 w-100 justify-content-center">
            <Button
              type="button"
              className="btn btn-danger px-4 btn-sm"
              onClick={onClick}
              label="Yes"
            />

            <Button
              type="button"
              className="btn btn-outline-secondary px-4 btn-sm"
              onClick={closeDialog}
              label="No"
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
