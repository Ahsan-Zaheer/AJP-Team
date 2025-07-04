import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

const ModalWrapper = ({ open, setOpen, children }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='position-relative w-100'
        style={{ zIndex: 100, padding: '20px' }}
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='position-fixed top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-50 transition-opacity' />
        </Transition.Child>

        <div className='position-fixed top-0 start-0 end-0 bottom-0 z-10 w-100 overflow-auto'>
          <div className='d-flex align-items-center justify-content-center min-vh-100 p-3 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-middle-y scale-95'
              enterTo='opacity-100 translate-middle-y scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-middle-y scale-100'
              leaveTo='opacity-0 translate-middle-y scale-95'
            >
              <Dialog.Panel className='bg-white rounded shadow-lg text-start w-100 position-relative overflow-hidden pb-0' style={{ maxWidth: '500px' }}>
                <div className='bg-white px-3 pt-3 pb-3'>
                  <div className='d-flex align-items-start'>
                    <div className='w-100 mt-2 text-start'>
                      {children}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalWrapper;
