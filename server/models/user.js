import bcrypt from "bcrypt";
import mongoose, {Schema}from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    gender: {type: String, required: false},
    department: {type: String, required: false},
    designation: {type: String, required: false},
    description: {type: String, required: false},
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    role: {type: String, enum: ["admin", "employee"] ,required: true},
    profileImage: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;