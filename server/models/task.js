import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: false },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    date: { type: Date, default: new Date() },
    priority: { type: String, enum: ["high", "medium", "normal", "low"], default: "medium" },
    stage: { type: String, enum: ["todo", "in progress", "completed"], default: "todo" },
    activities: [
        new Schema(
          {
            type: {
              type: String,
              enum: ["assigned", "started", "in progress", "bug", "completed", "commented"],
              default: "assigned",
            },
            activity: String,
            date: { type: Date, default: Date.now },
            by: { type: Schema.Types.ObjectId, ref: "User" },
          },
          { _id: false }
        )
      ],
    subTasks: [
      {
        title: String,
        date: Date,
        tag: String,
      },
    ],
    assets: [String],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
},
{ timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);

export default Task;