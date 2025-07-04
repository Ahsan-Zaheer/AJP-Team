import React from "react";
import clsx from "clsx";

const Textbox = React.forwardRef(
  ({ type, placeholder, label, className, register, name, error }, ref) => {
    return (
      <div className='w-100 d-flex flex-column gap-1'>
        {label && (
          <label htmlFor={name} className='form-label text-dark'>
            {label}
          </label>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx("form-control", className)}
          />
        </div>

        {error && (
          <div className='form-text text-danger small mt-1'>{error}</div>
        )}
      </div>
    );
  }
);

export default Textbox;
