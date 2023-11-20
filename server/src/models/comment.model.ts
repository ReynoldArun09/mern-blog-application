import mongoose from "mongoose";
import { ICommentModel } from "../helper/interface";

const commentSchema = new mongoose.Schema<ICommentModel>(
  {
    comment: {
      type: String,
    },
    username: {
      type: String,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


export default mongoose.model<ICommentModel>('Comment', commentSchema)