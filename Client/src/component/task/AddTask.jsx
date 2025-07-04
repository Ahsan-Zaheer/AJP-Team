import { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import { dateFormatter } from "../../utils/helper";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import { toast } from "sonner";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/slices/api/taskApiSlice";
import Button from "../Button";
import Loading from "../Loader";
import { useAuthStore } from "../../store/authStore";


const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];




const uploadFile = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "ajproduction"); // set this in Cloudinary
  data.append("cloud_name", "dpes0rvfh");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dpes0rvfh/image/upload",
      data
    );
    const url = res.data.secure_url;
    uploadedFileURLs.push(url);
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw err;
  }
};

const AddTask = ({ open, setOpen, task }) => {

  

  const defaultValues = {
    title: task?.title || "",
    date: dateFormatter(task?.date || new Date()),
    team: [],
    stage: "",
    priority: "",
    assets: [],
    description: "",
    links: "",
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [team, setTeam] = useState(task?.team || []);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const URLS = task?.assets ? [...task.assets] : [];

  const handleOnSubmit = async (data) => {



    for (const file of assets) {
      setUploading(true);
      try {
        await uploadFile(file);
      } catch (error) {
        console.error("Error uploading file:", error.message);
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      const newData = {
        ...data,
        assets: [...URLS, ...uploadedFileURLs],
        team,
        stage,
        priority,
      };
      console.log(data, newData);
      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

      toast.success(res.message);

      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };
  




  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title as='h2' className='fs-5 fw-bold text-dark mb-3'>
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className='mt-2 d-flex flex-column gap-4'>
          <Textbox
            placeholder='Task Title'
            type='text'
            name='title'
            label='Task Title'
            className='form-control w-100'
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <UserList setTeam={setTeam} team={team} />

            <div className='d-flex gap-3 flex-wrap w-100'>

            


             <SelectList
              label='Task Stage'
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
             />
            

            <div className='w-100'>
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
            </div>
          </div>

          <div className='d-flex gap-3 flex-wrap w-100 align-items-center'>
            <SelectList
              label='Priority Level'
              lists={PRIORIRY}
              selected={priority}
              setSelected={setPriority}
            />

            <div className='w-100 d-flex align-items-center justify-content-center mt-3'>
              <label
                htmlFor='imgUpload'
                className='d-flex align-items-center gap-2 text-primary cursor-pointer'
              >
                <input
                  type='file'
                  className='d-none'
                  id='imgUpload'
                  onChange={(e) => handleSelect(e)}
                  accept='.jpg, .png, .jpeg'
                  multiple={true}
                />
                <BiImages />
                <span>Add Assets</span>
              </label>
            </div>
          </div>

          

          

          <div className='bg-light py-4 d-flex flex-column flex-sm-row justify-content-end gap-3 mt-3'>
            {isLoading || isUpdating || uploading ? (
            <div className='py-4'>
              <Loading />
            </div>
            )  : (
              <Button
                label='Submit'
                type='submit'
                className='btn btn-primary px-4 text-white fw-semibold'
              />
            )}

            <Button
              type='button'
              className='btn btn-outline-secondary px-4 fw-semibold'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
