import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    dep_name : {
        type: String,
        required: true,
    },
    dep_members : {
        type: Number,
        required: true,
    },
    empDepartment : {
        type: String,
        required: false,
    },
    dep_email : {
        type: String,
        required: false,
    },
    dep_desc : {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const Department = mongoose.model("Department", departmentSchema);

export default Department;