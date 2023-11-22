import mongoose from 'mongoose';
import { IPostModel } from '../helper/interface';

const postSchema = new mongoose.Schema<IPostModel>(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    username: {
      type: String,
    },
    userId: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    categories: {
      type: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPostModel>('Post', postSchema);
