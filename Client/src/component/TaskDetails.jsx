import clsx from "clsx";  
import moment from "moment";
import  { useState } from "react";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Tabs from "./Tabs";
import { PRIOTITYSTYELS, TASK_TYPE, getInitials, getCompletedSubTasks } from "../utils/helper";
import Loading from "./Loader";
import Button from "./Button";
import { useChangeSubTaskStatusMutation, useGetSingleTaskQuery, usePostTaskActivityMutation } from "../redux/slices/api/taskApiSlice";



const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-danger-subtle",
  medium: "bg-warning-subtle",
  low: "bg-primary-subtle",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  commented: (
    <div className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white" style={{ width: '40px', height: '40px' }}>
      <MdOutlineMessage />
    </div>
  ),
  started: (
    <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white" style={{ width: '40px', height: '40px' }}>
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white" style={{ width: '24px', height: '24px' }}>
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className="text-danger">
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white" style={{ width: '40px', height: '40px' }}>
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className="d-flex align-items-center justify-content-center rounded-circle bg-info text-white" style={{ width: '32px', height: '32px' }}>
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];


const Activities = ({ activity, id, refetch }) => {
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");

  const [postActivity, { isLoading }] = usePostTaskActivityMutation();

  const handleSubmit = async () => {
    try {
      const data = {
        type: selected?.toLowerCase(),
        activity: text,
      };
      const res = await postActivity({
        data,
        id,
      }).unwrap();
      setText("");
      toast.success(res?.message);
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const Card = ({ item }) => {
    return (
      <div className='d-flex mb-4'>
        <div className='d-flex flex-column align-items-center me-3 flex-shrink-0'>
          <div className='d-flex justify-content-center align-items-center' style={{ width: "40px", height: "40px" }}>
            {TASKTYPEICON[item?.type]}
          </div>
          <div className='w-100 d-flex align-items-center'>
            <div style={{ width: "2px", height: "100%", backgroundColor: "#dee2e6" }}></div>
          </div>
        </div>

        <div className='d-flex flex-column mb-4'>
          <p className='fw-semibold mb-1'>{item?.by?.name}</p>
          <div className='text-muted mb-2'>
            <div className='text-capitalize'>{item?.type}</div>
            <div className='small'>{moment(item?.date).fromNow()}</div>
          </div>
          <div className='text-dark'>{item?.activity}</div>
        </div>
      </div>
    );
  };

  return (
    <div className='container-fluid bg-white shadow rounded p-5 min-vh-100 d-flex flex-wrap justify-content-between overflow-auto'>
      <div className='col-12 col-md-6 mb-4'>
        <h4 className='text-muted fw-semibold mb-3'>Activities</h4>

        <div>
          {activity?.map((el, index) => (
            <Card
              key={index}
              item={el}
              isConnected={index < activity.length - 1}
            />
          ))}
        </div>
      </div>

      <div className='col-12 col-md-5'>
        <h4 className='text-muted fw-semibold mb-3'>Add Activity</h4>

        <div className='d-flex flex-wrap gap-3'>
          {act_types.map((item, index) => (
            <div key={item} className='form-check d-flex align-items-center me-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id={`type-${index}`}
                checked={selected === item}
                onChange={() => setSelected(item)}
              />
              <label htmlFor={`type-${index}`} className='form-check-label'>
                {item}
              </label>
            </div>
          ))}

          <textarea
            rows={6}
            className='form-control mt-4'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type ......'
          ></textarea>

          <div className='mt-3'>
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type='button'
                label='Submit'
                onClick={handleSubmit}
                className='btn btn-primary'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TaskDetails = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(0);
  const { data, isLoading, refetch } = useGetSingleTaskQuery(id);
  const [subTaskAction, { isLoading: isSubmitting }] =
    useChangeSubTaskStatusMutation();

  const task = data?.task || [];

  const handleSubmitAction = async (el) => {
    try {
      const data = {
        id: el.id,
        subId: el.subId,
        status: !el.status,
      };
      const res = await subTaskAction({
        ...data,
      }).unwrap();

      toast.success(res?.message);
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading)
    <div className='py-10'>
      <Loading />
    </div>;

  const percentageCompleted =
    task?.subTasks?.length === 0
      ? 0
      : (getCompletedSubTasks(task?.subTasks) / task?.subTasks?.length) * 100;

  return (
    <div className="container-fluid d-flex flex-column gap-3 mb-4">
      <h1 className="fs-3 text-secondary fw-bold">{task?.title}</h1>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <div className="row g-4 bg-white shadow p-3 mt-4 overflow-auto">
            {/* LEFT */}
            <div className="col-md-6 d-flex flex-column gap-4">
              <div className="d-flex align-items-center gap-3">
                <div
                  className={`d-flex align-items-center gap-1 px-3 py-1 rounded-pill fw-semibold ${PRIOTITYSTYELS[task?.priority]} ${bgColor[task?.priority]}`}
                >
                  {ICONS[task?.priority]}
                  <span className="text-uppercase">{task?.priority} Priority</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <div className={`rounded-circle ${TASK_TYPE[task.stage]}`} style={{ width: '16px', height: '16px' }}></div>
                  <span className="text-uppercase text-dark">{task?.stage}</span>
                </div>
              </div>

              <p className="text-muted">Created At: {new Date(task?.date).toDateString()}</p>

              <div className="d-flex align-items-center gap-4 py-3 border-top border-bottom border-light">
                <div>
                  <span className="fw-semibold">Assets:</span> {task?.assets?.length}
                </div>

                <span className="text-muted">|</span>

                <div>
                  <span className="fw-semibold">Sub-Task:</span> {task?.subTasks?.length}
                </div>
              </div>

              <div className="py-4">
                <p className="text-muted fw-semibold small">TASK TEAM</p>
                <div className="d-flex flex-column gap-3">
                  {task?.team?.map((m, index) => (
                    <div
                      key={index}
                      className="d-flex gap-3 py-2 align-items-center border-top border-light"
                    >
                      <div className="d-flex align-items-center justify-content-center rounded-circle text-white bg-primary" style={{ width: '40px', height: '40px' }}>
                        <span>{getInitials(m?.name)}</span>
                      </div>

                      <div>
                        <p className="fw-semibold mb-0">{m?.name}</p>
                        <small className="text-muted">{m?.title}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-4">
                <p className="text-muted fw-semibold small">SUB-TASKS</p>
                <div className="d-flex flex-column gap-4">
                  {task?.subTasks?.map((el, index) => (
                    <div key={index} className="d-flex gap-3">
                      <div className="d-flex align-items-center justify-content-center rounded-circle bg-light text-info" style={{ width: '40px', height: '40px' }}>
                        <MdTaskAlt size={26} />
                      </div>

                      <div>
                        <div className="d-flex gap-2 align-items-center">
                          <small className="text-muted">{new Date(el?.date).toDateString()}</small>
                          <span className="badge bg-light text-info fw-semibold">{el?.tag}</span>
                        </div>
                        <p className="text-dark mb-0">{el?.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* RIGHT */}
            <div className="col-md-6 d-flex flex-column gap-4">
              <p className="fs-5 fw-semibold">ASSETS</p>
              <div className="row row-cols-2 g-3">
                {task?.assets?.map((el, index) => (
                  <div className="col" key={index}>
                    <img
                      src={el}
                      alt={task?.title}
                      className="img-fluid rounded border border-light"
                      style={{ height: "150px", objectFit: "cover", cursor: "pointer", transition: "transform 0.7s" }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.25)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          
          <Activities activity={task?.activities} id={id} refetch={refetch} />
        )}
      </Tabs>
    </div> 
  );
};


