import User, { IUser } from "../models/user.model";

/**
 * Service handling CRUD operations for the User collection.
 * Each function has a single responsibility: interacting with the DB for one specific action.
 */
export const UserService = {
  // CREATE
  async createUser(data: Partial<IUser>): Promise<IUser> {
    const user = new User(data);
    return await user.save();
  },

  // READ (All)
  async getAllUsers(): Promise<IUser[]> {
    return await User.find().select("-password_hash"); // Exclude sensitive data
  },

  // READ (One)
  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).select("-password_hash");
  },

  // UPDATE
  async updateUser(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password_hash");
  },

  // DELETE
  async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  },
};
