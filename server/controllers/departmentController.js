import Department from "../models/deparment.js";


export const addDepartment = async (req, res) => {
    try {
        const { dep_name, dep_members, empDepartment, dep_email, dep_desc } = req.body;



        if (!dep_name || !dep_members) {
            return res.status(400).json({ success: false, message: "Required Feild are empty" });
        }

        
        const newDepartment = new Department({
            dep_name,
            dep_members,
            empDepartment,
            dep_email,
            dep_desc
        });

        await newDepartment.save();

        return res.status(201).json({ success: true, message: "Department added successfully", newDepartment });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in addDepartment controller" });
    }
}


export const getAllDepartments = async (req, res) => {
    try {
        
        const response = await Department.find();
        if (!response) {
            return res.status(404).json({ success: false, message: "No departments found" });
        }
        return res.status(200).json({ success: true, departments: response });

        
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in getAllDepartments controller" });
        
    }
}


export const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findById({_id: id});

        return res.status(200).json({ success: true, message: "get Department successfully", department });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in getDepartment controller" });
    }
}



export const editDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, dep_members, empDepartment, dep_email, dep_desc } = req.body;

        if (!dep_name || !dep_members) {
            return res.status(400).json({ success: false, message: "Required Feild are empty" });
        }

        const department = await Department.findByIdAndUpdate(
            { _id: id },
            {
                dep_name,
                dep_members,
                empDepartment,
                dep_email,
                dep_desc
            },
            { new: true }
        );
        if (!department) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        return res.status(200).json({ success: true, message: "Department updated successfully", department });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in editDepartment controller" });
    }
}



export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

     
        const department = await Department.findByIdAndDelete(
            { _id: id },);
        if (!department) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        return res.status(200).json({ success: true, message: "Department deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in deleteDepartment controller" });
    }
}

