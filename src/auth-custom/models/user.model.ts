import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  avatar_url?: string;
  last_sign_in_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password_hash: {
      type: String,
      required: true,
    },
    avatar_url: {
      type: String,
      default: "",
    },
    last_sign_in_at: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

userSchema.pre("save", async function () {
  // Hash password if modified
  if (this.isModified("password_hash")) {
    this.password_hash = await bcrypt.hash(this.password_hash, 12);
  }

  // Skip updating updated_at if only last_sign_in_at was modified
  const modifiedPaths = this.modifiedPaths().filter(
    (path) => path !== "updated_at"
  );
  if (
    modifiedPaths.length === 1 &&
    modifiedPaths[0] === "last_sign_in_at" &&
    !this.isNew
  ) {
    // Preserve the original updated_at value
    const original = await (this.constructor as typeof User)
      .findById(this._id)
      .select("updated_at");
    if (original) {
      this.updated_at = original.updated_at;
    }
  }
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password_hash;
  return user;
};

const User = model<IUser>("User", userSchema);

export default User;
