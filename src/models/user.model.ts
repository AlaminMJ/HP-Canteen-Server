import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDoc extends Document {
  email: string;
  password: string;
  role: "admin" | "officer" | "user";
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDoc>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "officer", "user"], default: "user" },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export default model<UserDoc>("User", UserSchema);
