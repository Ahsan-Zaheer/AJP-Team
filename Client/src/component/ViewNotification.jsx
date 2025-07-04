import React from "react";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Button from "./Button";

const ViewNotification = ({ open, setOpen, el }) => {
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <div className="py-4 w-100 d-flex flex-column gap-3 align-items-center justify-content-center">
          <Dialog.Title as="h3" className="fw-semibold fs-5 text-center">
            {el?.task?.title}
          </Dialog.Title>

          <p className="text-start text-muted w-100">{el?.text}</p>

          <Button
            type="button"
            className="btn btn-outline-secondary px-4 mt-3"
            onClick={() => setOpen(false)}
            label="Ok"
          />
        </div>
      </ModalWrapper>
    </>
  );
};

export default ViewNotification;
