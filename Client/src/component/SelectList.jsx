import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdCheck } from "react-icons/md";

const SelectList = ({ lists, selected, setSelected, label }) => {
  return (
    <div className='w-100'>
      {label && <p className='text-dark'>{label}</p>}

      <Listbox value={selected} onChange={setSelected}>
        <div className='position-relative mt-2'>
          <Listbox.Button className='form-select w-100 px-3 py-2'>
            <span className='d-block text-truncate'>{selected}</span>
       
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='position-absolute z-3 mt-1 w-100 overflow-auto bg-white border rounded shadow-sm list-unstyled'>
              {lists.map((list, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `position-relative px-3 py-2 ${
                      active ? "bg-warning text-dark" : "text-dark"
                    }`
                  }
                  value={list}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`d-block text-truncate ${
                          selected ? "fw-medium" : "fw-normal"
                        }`}
                      >
                        {list}
                      </span>
                      {selected ? (
                        <span className='position-absolute top-50 start-0 translate-middle-y ps-2 text-warning'>
                          <MdCheck className='me-2' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectList;
