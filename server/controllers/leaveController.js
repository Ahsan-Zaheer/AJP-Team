import Leave from "../models/leave.js";
import Notice from "../models/notification.js";
import User from "../models/user.js";

export const addLeave = async (req, res) => {
    try {

       

        const { userId, leaveType, fromDate, toDate, reason } = req.body;



        if (!leaveType || !fromDate || !toDate || !reason) {
            return res.status(400).json({ success: false, message: "Required Feild are empty" });
        }

        const newLeave = new Leave({
            userId,
            leaveType,
            fromDate,
            toDate,
            reason
        });

        await newLeave.save();

        // create notification for admins
        try {
            const admins = await User.find({ role: 'admin' }).select('_id');
            const adminIds = admins.map((admin) => admin._id);
            const applyUser = await User.findById(userId).select('name');
            const text = `${applyUser?.name || 'An employee'} applied for ${leaveType} from ${new Date(fromDate).toLocaleDateString()} to ${new Date(toDate).toLocaleDateString()}.`;
            if (adminIds.length) {
                await Notice.create({ team: adminIds, text });
            }
        } catch (e) {
            console.error('Error creating leave notification:', e);
        }

        return res.status(201).json({ success: true, message: "Leave added successfully", newLeave });
    } catch (error) {
        console.error("Error details:", error);

        return res.status(500).json({ success: false, message: "Error in addLeave controller" });
    }
}


export const getLeave = async (req, res) => {
    try {

  
        const { id } = req.params;
        const leaves = await Leave.find({ userId: id});

        return res.status(201).json({ success: true, message: "get Leave successfully", leaves });
        
    } catch (error) {
        console.error("Error details:", error);

        return res.status(500).json({ success: false, message: "Error in getLeave controller" });
    }
}

export const updateLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }

        const updatedLeave = await Leave.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ success: false, message: "Leave not found" });
        }

        // notify user about status update
        try {
            const text = `Your leave request from ${new Date(updatedLeave.fromDate).toLocaleDateString()} to ${new Date(updatedLeave.toDate).toLocaleDateString()} has been ${status.toLowerCase()}.`;
            await Notice.create({ team: [updatedLeave.userId], text });
        } catch (e) {
            console.error('Error creating leave status notification:', e);
        }

        return res.status(200).json({ success: true, message: "Leave status updated successfully", updatedLeave });
    } catch (error) {
        console.error("Error in updateLeave controller:", error);
        return res.status(500).json({ success: false, message: "Server error in updateLeave controller" });
    }
};


export const getAllLeaves = async (req, res) => {
    try {

        const leaves = await Leave.find();

        return res.status(201).json({ success: true, message: "get All Leaves successfully", leaves });

    } catch (error) {
        console.error("Error details:", error);

        return res.status(500).json({ success: false, message: "Error in getAllLeave controller" });
    }
}

export const deleteLeave = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLeave = await Leave.findByIdAndUpdate(
            id,
            { isTrashed: true, updatedAt: new Date() },
            { new: true }
        );

        if (!deletedLeave) {
            return res.status(404).json({ success: false, message: "Leave not found" });
        }

        return res.status(200).json({ success: true, message: "Leave deleted (soft) successfully", deletedLeave });
    } catch (error) {
        console.error("Error in deleteLeave controller:", error);
        return res.status(500).json({ success: false, message: "Server error in deleteLeave controller" });
    }
};




export const restoreLeave = async (req, res) => {
    try {
        const { id } = req.params;

        const restoredLeave = await Leave.findByIdAndUpdate(
            id,
            { isTrashed: false, updatedAt: new Date() },
            { new: true }
        );

        if (!restoredLeave) {
            return res.status(404).json({ success: false, message: "Leave not found" });
        }

        return res.status(200).json({ success: true, message: "Leave restored successfully", restoredLeave });
    } catch (error) {
        console.error("Error in restoreLeave controller:", error);
        return res.status(500).json({ success: false, message: "Server error in restoreLeave controller" });
    }
};

export const permanentDeleteLeave = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLeave = await Leave.findByIdAndDelete(id);

        if (!deletedLeave) {
            return res.status(404).json({ success: false, message: "Leave not found" });
        }

        return res.status(200).json({ success: true, message: "Leave permanently deleted", deletedLeave });
    } catch (error) {
        console.error("Error in deleteLeave controller:", error);
        return res.status(500).json({ success: false, message: "Server error in deleteLeave controller" });
    }
};

