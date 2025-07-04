import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";
import Loading from "../Loader";
import { toast } from "sonner";


const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [addSbTask, { isLoading }] = useCreateSubTaskMutation();

  const handleOnSubmit = async (data) => {
    try {
      const res = await addSbTask({ data, id }).unwrap();
      toast.success(res.message);
      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title as='h2' className='h5 fw-bold text-dark mb-3'>
          ADD SUB-TASK
        </Dialog.Title>

        <div className='mt-2 d-flex flex-column gap-4'>
          <Textbox
            placeholder='Sub-Task title'
            type='text'
            name='title'
            label='Title'
            className='form-control w-100'
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title ? errors.title.message : ""}
          />

          <div className='d-flex gap-3 flex-wrap'>
            <Textbox
              placeholder='Date'
              type='date'
              name='date'
              label='Task Date'
              className='form-control w-100'
              register={register("date", {
                required: "Date is required!",
              })}
              error={errors.date ? errors.date.message : ""}
            />

            <Textbox
              placeholder='Tag'
              type='text'
              name='tag'
              label='Tag'
              className='form-control w-100'
              register={register("tag", {
                required: "Tag is required!",
              })}
              error={errors.tag ? errors.tag.message : ""}
            />
          </div>
        </div>

        {isLoading ? (
            <div className='mt-8'>
              <Loading />
            </div>
          ) : (
        <div className='mt-4 d-flex flex-row-reverse gap-2'>
          <Button
            type='submit'
            className='btn btn-primary btn-sm fw-semibold'
            label='Add Task'
          />

          <Button
            type='button'
            className='btn btn-outline-secondary btn-sm fw-semibold'
            onClick={() => setOpen(false)}
            label='Cancel'
          />
        </div>
          )}
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;
